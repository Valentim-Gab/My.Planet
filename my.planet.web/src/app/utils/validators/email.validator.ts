import { Injectable } from '@angular/core'
import { Validators } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class EmailValidator {
  private emailValidators = [
    Validators.required,
    Validators.maxLength(250),
    Validators.minLength(5),
    Validators.pattern(/.+@.+\..+/),
  ]

  public getEmailValidators() {
    return this.emailValidators
  }
}
