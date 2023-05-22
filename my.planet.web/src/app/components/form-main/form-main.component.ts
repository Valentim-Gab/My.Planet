import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'
import { EmailValidator } from 'src/app/utils/validators/email.validator'
import { PasswordValidator } from 'src/app/utils/validators/password.validator'

@Component({
  selector: 'app-form-main',
  templateUrl: './form-main.component.html',
  styleUrls: ['./form-main.component.scss'],
})
export class FormMainComponent implements OnInit {
  @Output() onEmitterUser = new EventEmitter<User>()
  @Input() action!: string
  @Input() user: User | null = null
  formMain!: FormGroup
  open = ''
  title: string = ''

  constructor(
    private emailValidator: EmailValidator,
    private passwordValidator: PasswordValidator,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title = this.action === 'Conta' ? 'Conta' : 'Cadastre-se'
    this.formMain = new FormGroup(
      {
        username: new FormControl(this.user ? this.user.username : '', [
          Validators.required,
        ]),
        email: new FormControl(
          this.user ? this.user.email : '',
          this.emailValidator.getEmailValidators()
        ),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordValidator.confirmValidator }
    )
  }

  get username() {
    return this.formMain.get('username')!
  }

  get email() {
    return this.formMain.get('email')!
  }

  get password() {
    return this.formMain.get('password')!
  }

  get password2() {
    return this.formMain.get('password2')!
  }

  onSubmit() {
    if (this.formMain.invalid) return
    this.onEmitterUser.emit(this.formMain.value)
  }

  openAlert() {
    this.open = this.open === '' ? 'open' : ''
  }

  deleteUser() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.userService.deleteUser(id).subscribe()
  }
}
