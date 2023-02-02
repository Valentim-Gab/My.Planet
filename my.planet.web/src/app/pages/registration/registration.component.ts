import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  action = 'new-register'

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  createUser(user: User) {
    user.description = ''
    user.img = ''
    user.permission = 'u'
    this.userService.createUser(user).subscribe()
  }
}
