import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MediaProject } from 'src/app/interfaces/MediaProject'
import { Project } from 'src/app/interfaces/Project'
import { YoutubeUtil } from 'src/app/utils/youtube.util'

@Injectable({
  providedIn: 'root',
})
export class PopupForm {
  constructor(private youtubeUtil: YoutubeUtil) {}

  initFormPopup(project: Project, mediaProject: MediaProject) {
    return new FormGroup({
      imgPopupProfile: new FormControl(''),
      popupName: new FormControl(project ? project.projectName : '', [
        Validators.required,
      ]),
      popupLink: new FormControl(project ? project.link : '', [
        Validators.required,
      ]),
      popupDescription: new FormControl(project ? project.description : '', [
        Validators.required,
      ]),
      imgPopupPacket: new FormControl(''),
      packetLink1: new FormControl(
        mediaProject ? `https://youtu.be/${mediaProject.firstVideo}` : '',
        [Validators.required, Validators.pattern(this.youtubeUtil.urlValidator)]
      ),
      packetLink2: new FormControl(
        mediaProject ? `https://youtu.be/${mediaProject.secondVideo}` : '',
        [Validators.required, Validators.pattern(this.youtubeUtil.urlValidator)]
      ),
    })
  }
}
