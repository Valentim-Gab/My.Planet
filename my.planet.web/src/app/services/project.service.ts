import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { Project } from '../interfaces/Project'
import { environment } from 'src/environments/environment'
import { Popup } from '../interfaces/Popup'
import { MessagesService } from './messages.service'

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}/project`

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  getAll(): Observable<Project[] | boolean> {
    return this.http.get<Project[]>(`${this.url}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getAllByUser(id: number): Observable<Project[] | boolean> {
    return this.http.get<Project[]>(`${this.url}/user/${id}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getProject(id: number): Observable<Project | boolean> {
    return this.http.get<Project>(`${this.url}/${id}`).pipe(
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

  createProject(formData: FormData): Observable<Project | boolean> {
    return this.http.post<Project>(`${this.url}`, formData).pipe(
      tap((response) => {
        return response
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  updateProject(id: number, formData: FormData): Observable<Project | boolean> {
    return this.http.put<Project>(`${this.url}/${id}`, formData).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  delete(id: number): Observable<Project | boolean> {
    return this.http.delete<Project>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.messagesService.add(`Projeto deletado!`)
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  buildRequisition(popup: Popup, id: number, formData: FormData): FormData {
    const project: Project = {
      projectName: popup.popupName,
      description: popup.popupDescription,
      img: undefined,
      link: popup.popupLink,
      idUser: id,
    }

    formData.set('project', JSON.stringify(project))
    return formData
  }
}
