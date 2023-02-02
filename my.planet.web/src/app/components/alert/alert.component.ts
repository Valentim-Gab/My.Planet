import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Output() emitterCloseAlert: EventEmitter<Event> = new EventEmitter()
  @Output() emitterDelete: EventEmitter<Event> = new EventEmitter()
  @Input() open!: string
  @Input() mainText!: string
  action = 'Conta'

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.emitterDelete.emit()
  }

  closeAlert() {
    this.emitterCloseAlert.emit()
  }
}
