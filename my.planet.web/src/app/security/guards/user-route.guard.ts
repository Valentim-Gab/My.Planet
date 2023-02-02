import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './../auth.service'
import { JwtService } from './../jwt.service'

@Injectable({
  providedIn: 'root',
})
export class UserRouteGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedInUserId = this.jwtService.getTokenSub()
    const routeUserId = route.params['id']

    if (loggedInUserId != routeUserId) {
      if (this.authService.userAuthenticated())
        this.router.navigate([`/perfil/${loggedInUserId}`])
      else this.router.navigate([`/login`])
      return false
    }
    return true
  }
}
