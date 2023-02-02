import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class YoutubeUtil {
  urlValidator: RegExp =
    /^https?:\/\/(www\.)?youtu((\.be)|(be\.com))\/(watch\?v=)?(.+)$/

  getYouTubeId(link: string) {
    const url = new URL(link)

    if (link.includes('youtu.be')) return url.pathname.slice(1)

    return url.searchParams.get('v')
  }
}
