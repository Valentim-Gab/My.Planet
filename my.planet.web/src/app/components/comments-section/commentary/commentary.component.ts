import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commentary } from 'src/app/interfaces/Commentary';
import { User } from 'src/app/interfaces/User';
import { JwtService } from 'src/app/security/jwt.service';
import { CommentaryService } from 'src/app/services/commentary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent implements OnInit {
  @Input() commentary!: Commentary
  @Output() emitterDeleteCommentary: EventEmitter<Commentary> = new EventEmitter<Commentary>()
  deleteComentaryOptions: boolean = false
  showDeleteIcon: boolean = false

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    if (this.commentary.user?.id == this.jwtService.getTokenSub())
      this.showDeleteIcon = true
  }

  showDeleteComentaryOptions() {
    this.deleteComentaryOptions = !this.deleteComentaryOptions
  }

  deleteCommenatary() {
    this.emitterDeleteCommentary.emit({ idCommentary: this.commentary.idCommentary! } as Commentary)
  }
}
