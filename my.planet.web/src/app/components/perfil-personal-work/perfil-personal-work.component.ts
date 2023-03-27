import { HttpResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { Media } from 'src/app/interfaces/Media'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { MediaService } from 'src/app/services/media.service'
import { PersonalWorkService } from 'src/app/services/personal-works.service'

@Component({
  selector: 'app-perfil-personal-work',
  templateUrl: './perfil-personal-work.component.html',
  styleUrls: ['./perfil-personal-work.component.scss'],
})
export class PerfilPersonalWorkComponent implements OnInit {
  @Input() personalWork!: PersonalWork
  popupVideo = ['popup-video']
  media!: Media
  linkVideo!: string
  personalWorkImg: string = '/assets/img/project_default.webp'
  mediaImg: string = '/assets/img/media_default.png'

  constructor(
    private mediaService: MediaService,
    private personalWorkService: PersonalWorkService
  ) {}

  ngOnInit(): void {
    if (this.personalWork && this.personalWork.img)
      this.personalWorkService.getImg(this.personalWork.img).subscribe((item) => {
        this.personalWorkImg = item
          ? ((item as HttpResponse<Blob>).url as string)
          : '/assets/img/project_default.webp'
      })
    else this.personalWorkImg = '/assets/img/project_default.webp'

    this.mediaService
      .getMediaByPersonalWork(this.personalWork.idPersonalWork!)
      .subscribe((item) => {
        this.addMedia(item as Media)
      })
  }

  addMedia(item: Media) {
    this.media = item
    if (this.media && this.media.img)
      this.mediaService
        .getImg(this.media.img)
        .subscribe((item) => {
          this.mediaImg = item
            ? ((item as HttpResponse<Blob>).url as string)
            : '/assets/img/media_default.png'
        })
    else this.mediaImg = '/assets/img/media_default.png'
  }

  openVideo(iframe?: HTMLIFrameElement, link?: string) {
    if (this.popupVideo.includes('open')) {
      this.popupVideo = ['popup-video']
      if (iframe) iframe.src = ''
    } else {
      this.popupVideo = ['popup-video', 'open']
      if (link && iframe) iframe.src = `https://www.youtube.com/embed/${link}`
    }
  }
}
