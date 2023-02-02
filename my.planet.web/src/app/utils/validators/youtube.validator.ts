import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class YoutubeValidator {
  urlValidator: RegExp =
    /^https?:\/\/(www\.)?youtu((\.be)|(be\.com))\/(watch\?v=)?(.+)$/
}
