import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { Media } from '../interfaces/Media'
import { environment } from 'src/environments/environment'
import { Popup } from '../interfaces/Popup'
import { YoutubeUtil } from '../utils/youtube.util'
import { MessagesService } from './messages.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}/media`

  constructor(
    private youtubeUtil: YoutubeUtil,
    private http: HttpClient,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  getMediaByPersonalWork(id: number): Observable<Media | boolean> {
    return this.http.get<Media>(`${this.url}/personal-work/${id}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getImg(imgName: string): Observable<HttpResponse<Blob> | boolean> {
    return this.http
      .get<Blob>(`${this.url}/img/${imgName}`, {
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .pipe(
        catchError(() => {
          return of(false)
        })
      )
  }

  createMedia(formData: FormData): Observable<Media | boolean> {
    return this.http.post<Media>(this.url, formData).pipe(
      tap(() => {
        this.messagesService.add(`Projeto adicionado!`)
      }),
      catchError(() => {
        return of(false)
      })
    )
  }

  updateMedia(
    id: number,
    formData: FormData,
    idUser: number
  ): Observable<Media | boolean> {
    return this.http.put<Media>(`${this.url}/${id}`, formData).pipe(
      tap(() => {
        this.messagesService.add(`Projeto atualizado!`)
        let url = this.router.url.includes('u') ? `${idUser}` : `u/${idUser}`
        this.router.navigate([`projetos/${url}`])
      }),
      catchError(() => {
        return of(false)
      })
    )
  }

  buildRequisition(popup: Popup, id: number, formData: FormData): FormData {
    const media: Media = {
      firstVideo: this.youtubeUtil.getYouTubeId(popup.packetLink1)!,
      secondVideo: this.youtubeUtil.getYouTubeId(popup.packetLink2)!,
      img: undefined,
      idPersonalWork: id,
    }
    formData.set('media', JSON.stringify(media))

    return formData
  }
}
