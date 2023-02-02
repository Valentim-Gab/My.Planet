import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class PasswordValidator {
  confirmValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!
    const password2 = control.get('password2')!

    if (password2.errors && !password2.errors['confirmedValidator']) {
      return password.errors
    }
    if (password.value !== password2.value) {
      return { confirmedValidator: true }
    } else {
      return null
    }
  }
}
