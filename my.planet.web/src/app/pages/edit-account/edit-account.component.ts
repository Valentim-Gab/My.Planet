import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {
  user!: User
  action = 'Conta'

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.userService.getUser(id).subscribe((item) => {
      this.user = item as User
    })
  }

  onSubmit(user: User) {
    const id = this.user.id

    const updUser: User = {
      username: user.username,
      description: this.user.description,
      img: this.user.img,
      email: user.email,
      password: user.password,
      permission: 'u',
    }

    this.userService.updateUser(id!, updUser).subscribe()
  }
}
