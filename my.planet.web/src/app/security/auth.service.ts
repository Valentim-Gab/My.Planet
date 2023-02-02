import { Injectable } from '@angular/core'
import { JwtService } from './jwt.service'

const token = localStorage.getItem('token')

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtService: JwtService) {}

  userAuthenticated(): boolean {
    if (token) {
      const tokenDecodedSub = this.jwtService.getTokenSub()
      if (tokenDecodedSub > -1) return true
    }
    return false
  }
}
