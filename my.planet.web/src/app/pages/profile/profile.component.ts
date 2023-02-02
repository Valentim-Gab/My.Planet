import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { JwtService } from 'src/app/security/jwt.service'
import { MediaProject } from 'src/app/interfaces/MediaProject'
import { Project } from 'src/app/interfaces/Project'
import { User } from 'src/app/interfaces/User'
import { ProjectService } from 'src/app/services/project.service'
import { UserService } from 'src/app/services/user.service'
import { ImageUtil } from 'src/app/utils/image.util'
import { HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  mediaProjects!: MediaProject[]
  projects!: Project[]
  user?: User
  popupForm!: FormGroup
  open = ''
  formData: FormData = new FormData()
  imgUpload: string = '/assets/img/upload-image.png'
  userImg: string = '/assets/img/default_profile.png'
  searchedValue!: string
  searchedProjects!: Project[]
  logged: boolean = false
  noProjects: boolean = false

  constructor(
    private imageUtil: ImageUtil,
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    if (this.jwtService.getTokenSub() == id) this.logged = true

    this.projectService.getAllByUser(id).subscribe((item) => {
      this.projects = item as Project[]
      this.searchedProjects = item as Project[]
      this.noProjects = this.searchedProjects.length > 0 ? false : true
    })
    this.userService.getUser(id).subscribe((item) => {
      this.popupFormData(item as User)
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
    this.searchedProjects = this.projects.filter((project) => {
      return project.projectName
        ?.toLowerCase()
        .includes((search as string).toLowerCase())
    })
    this.noProjects = this.searchedProjects.length > 0 ? false : true
  }
}
