import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { User } from '../interfaces/User'
import { environment } from 'src/environments/environment'
import { MessagesService } from './messages.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}/user`

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  getAll(): Observable<User[] | boolean> {
    return this.http.get<User[]>(`${this.url}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getUser(id: number): Observable<User | boolean> {
    return this.http.get<User>(`${this.url}/${id}`).pipe(
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
          this.messagesService.addError('Imagem não encontrada')
          return of(false)
        })
      )
  }

  createUser(user: User): Observable<User | boolean> {
    return this.http.post<User>(`${this.url}`, user).pipe(
      tap(() => {
        this.router.navigate(['/login'])
        this.messagesService.add('Cadastro realizado!')
      }),
      catchError((error) => {
        console.log(error)
        this.messagesService.addError(error.error)
        return of(false)
      })
    )
  }

  updateUser(id: number, user: User): Observable<User | boolean> {
    return this.http.put<User>(`${this.url}/${id}`, user).pipe(
      tap(() => {
        this.messagesService.add(`Dados atualizados!`)
        this.router.navigate([`/perfil/${id}`])
      }),
      catchError((error) => {
        this.messagesService.addError(error.error)
        return of(false)
      })
    )
  }

  updateUserPatch(
    id: number,
    formData: FormData
  ): Observable<User | boolean | String> {
    return this.http.patch<String>(`${this.url}/${id}`, formData).pipe(
      tap((response) => {
        this.messagesService.add('Perfil atualizado!')
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  deleteUser(id: number): Observable<User | boolean> {
    return this.http.delete<User>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.messagesService.add(`Conta deletada!`)
      }),
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }
}
