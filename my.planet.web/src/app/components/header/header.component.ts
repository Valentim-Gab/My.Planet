import { HttpResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/interfaces/User'
import { AuthService } from 'src/app/security/auth.service'
import { JwtService } from 'src/app/security/jwt.service'
import { LoginService } from 'src/app/services/login.service'
import { UserService } from 'src/app/services/user.service'
import { ImageUtil } from 'src/app/utils/image.util'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchedValue: string = ''
  users!: User[]
  searchedUsers!: User[]
  heightSearch: number = 6.2
  userImg: string = '/assets/img/default_profile.png'
  userLogged!: User

  constructor(
    public userService: UserService,
    private loginService: LoginService,
    public imageUtil: ImageUtil,
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((item) => {
      this.users = item as User[]
    })

    if (this.authService.userAuthenticated()) {
      this.userService
        .getUser(this.jwtService.getTokenSub())
        .subscribe((item) => {
          this.userLogged = item as User
          if (this.userLogged.img)
            this.userService
              .getImg(this.userLogged.img as string)
              .subscribe((item) => {
                this.userImg = item
                  ? ((item as HttpResponse<Blob>).url as string)
                  : '/assets/img/default_profile.png'
              })
          else this.userImg = '/assets/img/default_profile.png'
        })
    }
  }

  search() {
    this.searchedUsers = this.users.filter((user) => {
      return user.username
        ?.toLowerCase()
        .includes(this.searchedValue.toLowerCase())
    })
    this.heightSearch *= this.searchedUsers.length
    if (this.searchedUsers.length >= 3) this.heightSearch = 18.5
  }

  logout() {
    this.loginService.logout()
    location.href = '/'
  }
}
