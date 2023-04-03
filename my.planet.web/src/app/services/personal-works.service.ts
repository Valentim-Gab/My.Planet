import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { PersonalWork } from '../interfaces/PersonalWork'
import { environment } from 'src/environments/environment'
import { Popup } from '../interfaces/Popup'
import { MessagesService } from './messages.service'

@Injectable({
  providedIn: 'root',
})
export class PersonalWorkService {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}/personal-work`

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  getAll(): Observable<PersonalWork[] | boolean> {
    return this.http.get<PersonalWork[]>(`${this.url}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getAllByUser(id: number): Observable<PersonalWork[] | boolean> {
    return this.http.get<PersonalWork[]>(`${this.url}/user/${id}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getPersonalWork(id: number): Observable<PersonalWork | boolean> {
    return this.http.get<PersonalWork>(`${this.url}/${id}`).pipe(
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

  createPersonalWork(formData: FormData): Observable<PersonalWork | boolean> {
    return this.http.post<PersonalWork>(`${this.url}`, formData).pipe(
      tap((response) => {
        return response
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  updatePersonalWork(id: number, formData: FormData): Observable<PersonalWork | boolean> {
    return this.http.put<PersonalWork>(`${this.url}/${id}`, formData).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  updateVisibility(personalWork: PersonalWork): Observable<PersonalWork | boolean> {
    console.log(personalWork)
    return this.http.patch<PersonalWork>(`${this.url}/public/visibility`, personalWork).pipe(
      tap((item) => {
        let msg: string = (item.publicWork) ? 'público' : 'privado'
        this.messagesService.add(`Trabalho ${msg}`)
        return item as PersonalWork
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  delete(id: number): Observable<PersonalWork | boolean> {
    return this.http.delete<PersonalWork>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.messagesService.add(`Trabalho deletado!`)
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  buildRequisition(popup: Popup, id: number, formData: FormData): FormData {
    const personalWork: PersonalWork = {
      personalWorkName: popup.popupName,
      description: popup.popupDescription,
      img: undefined,
      link: popup.popupLink,
      idUser: id,
    }

    formData.set('personal-work', JSON.stringify(personalWork))
    return formData
  }
}
