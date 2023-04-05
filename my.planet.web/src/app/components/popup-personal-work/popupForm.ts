import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Media } from 'src/app/interfaces/Media'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { YoutubeUtil } from 'src/app/utils/youtube.util'

@Injectable({
  providedIn: 'root',
})
export class PopupForm {
  constructor(private youtubeUtil: YoutubeUtil) {}

  initFormPopup(personalWork: PersonalWork, media: Media) {
    return new FormGroup({
      imgPopupProfile: new FormControl(''),
      popupName: new FormControl(personalWork ? personalWork.personalWorkName : '', [
        Validators.required,
      ]),
      popupLink: new FormControl(personalWork ? personalWork.link : '', [
        Validators.required,
      ]),
      popupDescription: new FormControl(personalWork ? personalWork.description : '', [
        Validators.required,
      ]),
      imgPopupPacket: new FormControl(''),
      packetLink1: new FormControl(
        media ? `https://youtu.be/${media.firstVideo}` : '',
        [Validators.required, Validators.pattern(this.youtubeUtil.urlValidator)]
      ),
      packetLink2: new FormControl(
        media ? `https://youtu.be/${media.secondVideo}` : '',
        [Validators.required, Validators.pattern(this.youtubeUtil.urlValidator)]
      ),
      category: new FormControl(personalWork ? personalWork.personalWorkName : '', [
        Validators.required,
      ]),
    })
  }
}
