import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'

const token = localStorage.getItem('token')

const jwtHelper = new JwtHelperService()

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getTokenSub(): number {
    const decodedToken = jwtHelper.decodeToken(token as string)
    if (decodedToken?.sub) return decodedToken.sub

    return -1
  }

  expiredToken(): boolean {
    return jwtHelper.isTokenExpired(token)
  }
}
