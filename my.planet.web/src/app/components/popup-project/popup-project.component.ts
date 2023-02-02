import { HttpResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MediaProject } from 'src/app/interfaces/MediaProject'
import { Popup } from 'src/app/interfaces/Popup'
import { Project } from 'src/app/interfaces/Project'
import { MediaProjectService } from 'src/app/services/mediaProject.service'
import { ProjectService } from 'src/app/services/project.service'
import { ImageUtil } from 'src/app/utils/image.util'
import { PopupForm } from './popupForm'

@Component({
  selector: 'app-popup-project',
  templateUrl: './popup-project.component.html',
  styleUrls: ['./popup-project.component.scss'],
})
export class PopupProjectComponent implements OnInit {
  @Output() emitterClosePopup: EventEmitter<Event> = new EventEmitter()
  @Output() refreshList: EventEmitter<Event> = new EventEmitter()
  @Input() open!: string
  @Input() project: Project | null = null
  @Input() mediaProject: MediaProject | null = null
  formDataProject: FormData = new FormData()
  formDataMediaProject: FormData = new FormData()
  popupForm!: FormGroup
  refreshValidator = false
  imgUpload: string = `/assets/img/upload-image.png`
  mediaImgUpload: string = 'Escolha uma imagem'
  id: number = Number(this.route.snapshot.paramMap.get('id'))

  constructor(
    private popupFormInit: PopupForm,
    private projectService: ProjectService,
    private mediaProjectService: MediaProjectService,
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
    this.imageUtil.updateTitle(event, file_file_name, this.formDataMediaProject)
  }

  fileChange(event: Event | null, ImagePopupImg: HTMLImageElement) {
    const file = this.imageUtil.fileChange(event!, ImagePopupImg)
    this.formDataProject.set('img', file)
  }

  removeImg(ImagePopupImg: HTMLImageElement) {
    ImagePopupImg!.src = this.imageUtil.removeImg(
      this.imgUpload,
      '/assets/img/upload-image.png',
      this.formDataProject
    )
  }

  removeMediaImg(file_file_name: HTMLInputElement) {
    file_file_name.value = ''
    this.imageUtil.removeImg(null, '', this.formDataMediaProject)
    this.mediaImgUpload = 'Escolha uma imagem'
  }

  onSubmit(ImagePopupImg: HTMLImageElement, file_file_name: HTMLInputElement) {
    this.refreshValidator = false
    if (this.popupForm.invalid) return
    const popup: Popup = this.popupForm.value
    this.formDataProject = this.projectService.buildRequisition(
      popup,
      this.id,
      this.formDataProject
    )

    const project: Project = {
      idProject: this.project?.idProject,
      projectName: this.project?.projectName!,
      description: this.project?.description!,
      link: this.project?.link!,
      img: this.project?.img,
    }

    const mediaProject: MediaProject = {
      idMedia: this.mediaProject?.idMedia,
      firstVideo: this.mediaProject?.firstVideo!,
      secondVideo: this.mediaProject?.secondVideo!,
      img: this.mediaProject?.img,
      idProject: 2,
    }

    if (!this.project)
      this.projectService
        .createProject(this.formDataProject)
        .subscribe((item) => {
          this.addMediaProject(item as Project, popup)
        })
    else
      this.projectService
        .updateProject(project.idProject!, this.formDataProject)
        .subscribe(() => {
          this.updateMediaProject(popup, mediaProject, project)
        })

    this.closePopup(ImagePopupImg, file_file_name)
  }

  async addMediaProject(project: Project, popup: Popup) {
    this.formDataMediaProject = this.mediaProjectService.buildRequisition(
      popup,
      project.idProject!,
      this.formDataMediaProject
    )

    this.mediaProjectService
      .createMediaProject(this.formDataMediaProject)
      .subscribe()
    this.formDataMediaProject.delete('img')
    this.formDataProject.delete('img')
    this.refreshList.emit()
  }

  updateMediaProject(
    popup: Popup,
    mediaProject: MediaProject,
    project: Project
  ) {
    this.mediaProjectService.buildRequisition(
      popup,
      project.idProject!,
      this.formDataMediaProject
    )

    this.mediaProjectService
      .updateMediaProject(
        mediaProject.idMedia!,
        this.formDataMediaProject,
        this.id
      )
      .subscribe()
  }

  refreshFormPopup(mediaProject: MediaProject | null) {
    if (mediaProject) this.mediaProject = mediaProject

    if (this.project && this.project.img)
      this.projectService.getImg(this.project.img).subscribe((item) => {
        this.imgUpload = item
          ? ((item as HttpResponse<Blob>).url as string)
          : `/assets/img/upload-image.png`
      })
    else this.imgUpload = `/assets/img/upload-image.png`

    if (this.mediaProject && this.mediaProject.img)
      this.mediaImgUpload = `Alterar a imagem existente`

    this.popupForm = this.popupFormInit.initFormPopup(
      this.project!,
      this.mediaProject!
    )
  }
}
