import { HttpResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Media } from 'src/app/interfaces/Media'
import { Popup } from 'src/app/interfaces/Popup'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { MediaService } from 'src/app/services/media.service'
import { PersonalWorkService } from 'src/app/services/personal-works.service'
import { ImageUtil } from 'src/app/utils/image.util'
import { PopupForm } from './popupForm'

@Component({
  selector: 'app-popup-personal-work',
  templateUrl: './popup-personal-work.component.html',
  styleUrls: ['./popup-personal-work.component.scss'],
})
export class PopupPersonalWorkComponent implements OnInit {
  @Output() emitterClosePopup: EventEmitter<Event> = new EventEmitter()
  @Output() refreshList: EventEmitter<Event> = new EventEmitter()
  @Input() open!: string
  @Input() personalWork: PersonalWork | null = null
  @Input() media: Media | null = null
  formDataPersonalWork: FormData = new FormData()
  formDataMedia: FormData = new FormData()
  popupForm!: FormGroup
  refreshValidator = false
  imgUpload: string = `/assets/img/upload-image.png`
  mediaImgUpload: string = 'Escolha uma imagem'
  id: number = Number(this.route.snapshot.paramMap.get('id'))

  constructor(
    private popupFormInit: PopupForm,
    private personalWorkService: PersonalWorkService,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private imageUtil: ImageUtil
  ) {}

  ngOnInit(): void {
    this.refreshFormPopup(null)
  }

  get imgPopupProfile() {
    return this.popupForm.get('imgPopupProfile')!
  }
  get popupName() {
    return this.popupForm.get('popupName')!
  }
  get popupLink() {
    return this.popupForm.get('popupLink')!
  }
  get popupDescription() {
    return this.popupForm.get('popupDescription')!
  }
  get imgPopupPacket() {
    return this.popupForm.get('imgPopupPacket')!
  }
  get packetLink1() {
    return this.popupForm.get('packetLink1')!
  }
  get packetLink2() {
    return this.popupForm.get('packetLink2')!
  }

  closePopup(
    ImagePopupImg: HTMLImageElement | null,
    file_file_name: HTMLInputElement | null
  ) {
    this.emitterClosePopup.emit()
    this.popupForm.reset()
    this.refreshValidator = true
    this.imgUpload = '/assets/img/upload-image.png'
    if (ImagePopupImg) ImagePopupImg!.src = this.imgUpload

    this.mediaImgUpload = 'Escolha uma imagem'
    if (file_file_name) file_file_name!.value = ''
  }

  clickImagePacket(file_upload: HTMLElement) {
    file_upload.click()
  }

  photoClick(inputElement: HTMLElement) {
    inputElement.click()
  }

  updateTitle(event: Event, file_file_name: HTMLInputElement) {
    this.imageUtil.updateTitle(event, file_file_name, this.formDataMedia)
  }

  fileChange(event: Event | null, ImagePopupImg: HTMLImageElement) {
    const file = this.imageUtil.fileChange(event!, ImagePopupImg)
    this.formDataPersonalWork.set('img', file)
  }

  removeImg(ImagePopupImg: HTMLImageElement) {
    ImagePopupImg!.src = this.imageUtil.removeImg(
      this.imgUpload,
      '/assets/img/upload-image.png',
      this.formDataPersonalWork
    )
  }

  removeMediaImg(file_file_name: HTMLInputElement) {
    file_file_name.value = ''
    this.imageUtil.removeImg(null, '', this.formDataMedia)
    this.mediaImgUpload = 'Escolha uma imagem'
  }

  onSubmit(ImagePopupImg: HTMLImageElement, file_file_name: HTMLInputElement) {
    this.refreshValidator = false
    if (this.popupForm.invalid) return
    const popup: Popup = this.popupForm.value
    this.formDataPersonalWork = this.personalWorkService.buildRequisition(
      popup,
      this.id,
      this.formDataPersonalWork
    )

    const personalWork: PersonalWork = {
      idPersonalWork: this.personalWork?.idPersonalWork,
      personalWorkName: this.personalWork?.personalWorkName!,
      description: this.personalWork?.description!,
      link: this.personalWork?.link!,
      img: this.personalWork?.img,
    }

    const media: Media = {
      idMedia: this.media?.idMedia,
      firstVideo: this.media?.firstVideo!,
      secondVideo: this.media?.secondVideo!,
      img: this.media?.img,
      idPersonalWork: 2,
    }

    if (!this.personalWork)
      this.personalWorkService
        .createPersonalWork(this.formDataPersonalWork)
        .subscribe((item) => {
          this.addMedia(item as PersonalWork, popup)
        })
    else
      this.personalWorkService
        .updatePersonalWork(personalWork.idPersonalWork!, this.formDataPersonalWork)
        .subscribe(() => {
          this.updateMedia(popup, media, personalWork)
        })

    this.closePopup(ImagePopupImg, file_file_name)
  }

  async addMedia(personalWork: PersonalWork, popup: Popup) {
    this.formDataMedia = this.mediaService.buildRequisition(
      popup,
      personalWork.idPersonalWork!,
      this.formDataMedia
    )

    this.mediaService
      .createMedia(this.formDataMedia)
      .subscribe()
    this.formDataMedia.delete('img')
    this.formDataPersonalWork.delete('img')
    this.refreshList.emit()
  }

  updateMedia(
    popup: Popup,
    media: Media,
    personalWork: PersonalWork
  ) {
    this.mediaService.buildRequisition(
      popup,
      personalWork.idPersonalWork!,
      this.formDataMedia
    )

    this.mediaService
      .updateMedia(
        media.idMedia!,
        this.formDataMedia,
        this.id
      )
      .subscribe()
  }

  refreshFormPopup(media: Media | null) {
    if (media) this.media = media

    if (this.personalWork && this.personalWork.img)
      this.personalWorkService.getImg(this.personalWork.img).subscribe((item) => {
        this.imgUpload = item
          ? ((item as HttpResponse<Blob>).url as string)
          : `/assets/img/upload-image.png`
      })
    else this.imgUpload = `/assets/img/upload-image.png`

    if (this.media && this.media.img)
      this.mediaImgUpload = `Alterar a imagem existente`

    this.popupForm = this.popupFormInit.initFormPopup(
      this.personalWork!,
      this.media!
    )
  }
}
