import { Injectable } from '@angular/core'
import { CanActivate, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { MessagesService } from 'src/app/services/messages.service'
import { JwtService } from './../jwt.service'

@Injectable({
  providedIn: 'root',
})
export class ExpiredGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private messagesService: MessagesService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null

    if (token)
      if (this.jwtService.expiredToken()) {
        localStorage.removeItem('token')
        this.messagesService.addError('Sessão expirada!')
        setTimeout(() => {
          location.href = '/login'
        }, 2000)
        return false
      }
    return true
  }
}
