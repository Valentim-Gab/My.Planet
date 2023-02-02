import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { User } from '../interfaces/User'
import { environment } from 'src/environments/environment'
import { Login } from '../interfaces/Login'
import { MessagesService } from './messages.service'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiUrl = environment.baseApiUrl

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  login(login: Login): Observable<User | boolean> {
    const url = `${this.baseApiUrl}/login`

    return this.http.post<User>(`${url}`, login).pipe(
      tap((response) => {
        this.setToken(response)
        location.reload()
      }),
      catchError((error) => {
        this.messagesService.addError(error.error)
        return of(false)
      })
    )
  }

  setToken(user: User) {
    localStorage.setItem('token', user.token!)
  }

  logout() {
    localStorage.removeItem('token')
  }
}
