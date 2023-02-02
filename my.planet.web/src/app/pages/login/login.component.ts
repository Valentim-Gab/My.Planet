import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Login } from 'src/app/interfaces/Login'
import { User } from 'src/app/interfaces/User'
import { LoginService } from 'src/app/services/login.service'
import { EmailValidator } from 'src/app/utils/validators/email.validator'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<User>()
  formLogin!: FormGroup

  constructor(
    private emailValidator: EmailValidator,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', this.emailValidator.getEmailValidators()),
      password: new FormControl('', [Validators.required]),
    })
  }

  get email() {
    return this.formLogin.get('email')!
  }

  get password() {
    return this.formLogin.get('password')!
  }

  submit() {
    if (this.formLogin.invalid) return

    const login: Login = this.formLogin.value

    this.loginService.login(login).subscribe()
  }
}
