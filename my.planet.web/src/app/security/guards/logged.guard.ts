import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './../auth.service'
import { JwtService } from './../jwt.service'

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  canActivate(): boolean {
    if (this.authService.userAuthenticated()) {
      const id = this.jwtService.getTokenSub()
      this.router.navigate([`perfil/${id}`])
      return false
    }
    return true
  }
}
