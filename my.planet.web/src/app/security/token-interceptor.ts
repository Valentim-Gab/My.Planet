import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { MessagesService } from '../services/messages.service'
import { JwtService } from './jwt.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private messagesService: MessagesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token'))
      if (!this.jwtService.expiredToken())
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
      else {
        localStorage.removeItem('token')
        this.messagesService.addError('Sessão expirada!')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
    return next.handle(req)
  }
}
