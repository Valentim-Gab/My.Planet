import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { Media } from '../interfaces/Media'
import { environment } from 'src/environments/environment'
import { Popup } from '../interfaces/Popup'
import { YoutubeUtil } from '../utils/youtube.util'
import { MessagesService } from './messages.service'
import { Router } from '@angular/router'
import { Commentary } from '../interfaces/Commentary'

@Injectable({
  providedIn: 'root',
})
export class CommentaryService {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}/commentary`

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
  ) {}

  getCommentaryByPersonalWork(id: number): Observable<Commentary[] | boolean> {
    return this.http.get<Commentary[]>(`${this.url}/work/${id}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  createCommentary(commentary: Commentary): Observable<Commentary | boolean> {
    return this.http.post<Commentary>(this.url, commentary).pipe(
      tap(() => {
        this.messagesService.add(`Comentário adicionado!`)
      }),
      catchError(() => {
        return of(false)
      })
    )
  }

  delete(idCommentary: number): Observable<Commentary | boolean> {
    return this.http.delete<Commentary>(`${this.url}/${idCommentary}`).pipe(
      tap(() => {
        this.messagesService.add(`Comentário deletado!`)
      }),
      catchError(() => {
        return of(false)
      })
    )
  }
}
