import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { JwtService } from 'src/app/security/jwt.service'
import { Media } from 'src/app/interfaces/Media'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { User } from 'src/app/interfaces/User'
import { PersonalWorkService } from 'src/app/services/personal-works.service'
import { UserService } from 'src/app/services/user.service'
import { ImageUtil } from 'src/app/utils/image.util'
import { HttpResponse } from '@angular/common/http'
import { categoryService } from 'src/app/services/category.service'
import { Category } from 'src/app/interfaces/Category'
import { CategoryButtonComponent } from 'src/app/components/category-button/category-button.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', './popup-registration.scss'],
})
export class ProfileComponent implements OnInit {
  medias!: Media[]
  personalWorks!: PersonalWork[]
  user?: User
  popupForm!: FormGroup
  open = ''
  formData: FormData = new FormData()
  imgUpload: string = '/assets/img/upload-image.png'
  userImg: string = '/assets/img/default_profile.png'
  searchedValue!: string
  searchedPersonalWorks!: PersonalWork[]
  logged: boolean = false
  noPersonalWork: boolean = false
  numberWorks: number = 0
  categories: Category[] = []
  categoryActivated: string = ''

  constructor(
    private imageUtil: ImageUtil,
    private personalWorkService: PersonalWorkService,
    private userService: UserService,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private categoryService: categoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    if (this.jwtService.getTokenSub() == id) this.logged = true

    this.personalWorkService.getAllByUserPublic(id).subscribe((item) => {
      this.personalWorks = item as PersonalWork[]
      this.searchedPersonalWorks = item as PersonalWork[]
      if (this.searchedPersonalWorks.length > 0) {
        this.noPersonalWork = !this.searchedPersonalWorks.some(
          (personalWork) => {
            return personalWork.publicWork
          }
        )
      } else this.noPersonalWork = true
    })
    this.userService.getUser(id).subscribe((item) => {
      this.popupFormData(item as User)
    })

    this.categoryService.getAll().subscribe((item) => {
      this.categories = item as Category[]
      console.log(item)
    })
  }

  popupFormData(item: User) {
    this.user = item

    if (this.user.img)
      this.userService.getImg(this.user.img as string).subscribe((item) => {
        if ((item as HttpResponse<Blob>).url) {
          this.userImg = (item as HttpResponse<Blob>).url as string
          this.imgUpload = (item as HttpResponse<Blob>).url as string
        } else this.userImg = '/assets/img/default_profile.png'
      })
    else this.userImg = '/assets/img/default_profile.png'

    this.popupForm = new FormGroup({
      imgPopupProfile: new FormControl(''),
      popupDescription: new FormControl(this.user ? this.user.description : ''),
    })
  }

  get imgPopupProfile() {
    return this.popupForm.get('imgPopupProfile')!
  }
  get popupDescription() {
    return this.popupForm.get('popupDescription')!
  }

  openClosePopup() {
    this.open = this.open === '' ? 'open' : ''
  }

  photoClick(inputElement: HTMLInputElement) {
    inputElement.click()
  }

  fileChange(event: Event, perfilPopupImg: HTMLImageElement) {
    const file = this.imageUtil.fileChange(event, perfilPopupImg)
    this.formData.set('img', file)
  }

  removeImg(ImagePopupImg: HTMLImageElement) {
    ImagePopupImg!.src = this.imageUtil.removeImg(
      null,
      '/assets/img/upload-image.png',
      this.formData
    )
  }

  onSubmit(perfilPopupImg: HTMLImageElement) {
    if (this.popupForm.invalid) return

    if (this.formData.get('img'))
      this.user!.img! = perfilPopupImg.src.replaceAll(
        /data:image\/.+?;base64,/g,
        ''
      )
    else if (perfilPopupImg.src.includes('/assets/img/upload-image.png'))
      this.userImg = '/assets/img/default_profile.png'

    this.formData.set('description', this.popupForm.value.popupDescription)
    this.user!.description = this.popupForm.value.popupDescription
    this.userService
      .updateUserPatch(this.user!.id!, this.formData)
      .subscribe(() => {
        this.userService.getUser(this.user!.id!).subscribe((item) => {
          this.user = item as User
          if (item && (item as User).img) {
            this.userService
              .getImg((item as User).img!)
              .subscribe((itemImg) => {
                this.userImg = (itemImg as HttpResponse<Blob>).url as string
              })
          }
        })
      })
    this.openClosePopup()
  }

  search(search: string) {
    this.searchedPersonalWorks = this.personalWorks.filter((personalWork) => {
      if (
        personalWork.personalWorkName
          ?.toLowerCase()
          .includes((search as string).toLowerCase())
      )
        if (this.categoryActivated)
          return personalWork.category?.nameCategory
            ?.toLowerCase()
            .includes((this.categoryActivated as string).toLowerCase())
        else return true
      return false
    })
    if (this.searchedPersonalWorks.length > 0) {
      this.noPersonalWork = !this.searchedPersonalWorks.some((personalWork) => {
        return personalWork.publicWork
      })
    } else this.noPersonalWork = true
  }

  filterByCategory(
    nameCategory: string,
    appCategoryButton: CategoryButtonComponent | null,
    appCategoryButtonAll: CategoryButtonComponent | null
  ) {
    if (nameCategory) {
      this.searchedPersonalWorks = this.personalWorks.filter((personalWork) => {
        return personalWork.category?.nameCategory
          ?.toLowerCase()
          .includes((nameCategory as string).toLowerCase())
      })
      appCategoryButtonAll!.active = false

      if (appCategoryButton) {
        if (this.categoryActivated != nameCategory) {
          this.categoryActivated = nameCategory
          this.categories.forEach((category) => {
            appCategoryButton.active = (category.nameCategory === nameCategory)
          })
        }
      }
    } else {
      this.searchedPersonalWorks = this.personalWorks.filter((personalWork) => {
        return personalWork
      })
      this.categoryActivated = ''
    }

    if (this.searchedPersonalWorks.length > 0)
      this.noPersonalWork = !this.searchedPersonalWorks.some((personalWork) => {
        return personalWork.publicWork
      })
    else this.noPersonalWork = true
  }
}
