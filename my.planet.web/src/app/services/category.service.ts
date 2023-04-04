import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { catchError, Observable, of, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { MessagesService } from './messages.service'
import { Category } from '../interfaces/Category'

@Injectable({
  providedIn: 'root',
})
export class categoryService {
  private baseApiUrl = environment.baseApiUrl
  url = `${this.baseApiUrl}/category`

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
  ) {}

  getAll(): Observable<Category[] | boolean> {
    return this.http.get<Category[]>(`${this.url}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }

  getOne(id: number): Observable<Category | boolean> {
    return this.http.get<Category>(`${this.url}/${id}`).pipe(
      catchError(() => {
        this.messagesService.addError('Ocorreu um erro!')
        return of(false)
      })
    )
  }
}
