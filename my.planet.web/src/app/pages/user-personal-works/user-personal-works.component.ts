import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PopupPersonalWorkComponent } from 'src/app/components/popup-personal-work/popup-personal-work.component'
import { Media } from 'src/app/interfaces/Media'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { MediaService } from 'src/app/services/media.service'
import { PersonalWorkService } from 'src/app/services/personal-works.service'

@Component({
  selector: 'app-user-personal-works',
  templateUrl: './user-personal-works.component.html',
  styleUrls: ['./user-personal-works.component.scss'],
})
export class UserPersonalWorksComponent implements OnInit {
  personalWorks!: PersonalWork[] | null
  open = ''
  openEdit = ''
  openAlertPersonalWork = ''
  id = Number(this.route.snapshot.paramMap.get('id'))
  personalWork!: PersonalWork | null
  media!: Media | null
  id_personalWork!: number
  searchedValue: string = ''
  searchedPersonalWorks!: PersonalWork[]
  noPersonalWorks: boolean = false

  constructor(
    private mediaService: MediaService,
    private personalWorkService: PersonalWorkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refreshList()
  }

  @ViewChild('appPopupPesonalWork', { static: false }) child:
    | PopupPersonalWorkComponent
    | undefined
  callChildFunction(item: Media) {
    this.media = item
    this.child!.refreshFormPopup(item)
  }

  openPopup(edit: boolean, personalWork: null | PersonalWork | Object) {
    const personalWork2: PersonalWork = personalWork as PersonalWork

    if (edit)
      this.personalWorkService.getPersonalWork(personalWork2!.idPersonalWork!).subscribe((item) => {
        this.addMedia(item as PersonalWork)
      })
    else {
      if (this.open === '') this.open = 'open'
      else {
        this.open = ''
        this.addMedia(null)
      }
    }
  }

  addMedia(item: PersonalWork | null) {
    this.personalWork = item
    if (this.open === '' && this.personalWork)
      this.mediaService
        .getMediaByPersonalWork(this.personalWork.idPersonalWork!)
        .subscribe((item) => {
          this.openPopupEdit(item as Media)
        })
    else this.media = item as null
  }

  openPopupEdit(item: Media) {
    this.callChildFunction(item)
    if (this.open === '' && this.media) this.open = 'open'
  }

  refreshList() {
    this.personalWorkService.getAllByUser(this.id).subscribe((item) => {
      this.personalWorks = item as PersonalWork[]
      this.searchedPersonalWorks = item as PersonalWork[]
      this.noPersonalWorks = this.searchedPersonalWorks.length > 0 ? false : true
    })
  }

  openAlert(personalWork?: PersonalWork | Object | null) {
    const personalWork2 = personalWork as PersonalWork

    if (this.openAlertPersonalWork === '') {
      this.openAlertPersonalWork = 'open'
      if (personalWork) this.id_personalWork = personalWork2.idPersonalWork!
    } else this.openAlertPersonalWork = ''
  }

  deletePersonalWork(id: number) {
    this.personalWorkService.delete(id).subscribe((item) => {
      this.refreshList()
    })
    this.openAlert()
  }

  search(search: string) {
    this.searchedPersonalWorks = this.personalWorks!.filter((personalWork) => {
      return personalWork.personalWorkName
        ?.toLowerCase()
        .includes((search as string).toLowerCase())
    })
    this.noPersonalWorks = this.searchedPersonalWorks.length > 0 ? false : true
  }
}
