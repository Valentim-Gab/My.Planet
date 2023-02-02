import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message!: string
  show!: string
  sucess: boolean = true

  constructor() {}

  add(message: string) {
    this.sendMessage(message, true)
  }

  addError(message: string) {
    this.sendMessage(message, false)
  }

  clear() {
    this.message = ''
    this.show = ''
  }

  sendMessage(message: string, sucess: boolean) {
    let time: number = 7000
    this.message = message
    this.show = 'show'
    this.sucess = sucess
    setTimeout(() => {
      this.clear()
    }, time)
  }
}
