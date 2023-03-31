import { Component, Input, OnInit } from '@angular/core'
import { Commentary } from 'src/app/interfaces/Commentary'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { User } from 'src/app/interfaces/User'
import { JwtService } from 'src/app/security/jwt.service'
import { CommentaryService } from 'src/app/services/commentary.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent implements OnInit {
  @Input() personalWork!: PersonalWork
  @Input() showing: string = ''
  commentarys!: Commentary[]
  txtCommentary: string = ''

  constructor(
    private commentaryService: CommentaryService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.refresh()
  }

  comment() {
    if (this.txtCommentary) {
      let id = this.jwtService.getTokenSub()

      if (id >= 0)
        this.userService.getUser(id).subscribe((item) => {
          const commentary: Commentary = {
            txtCommentary: this.txtCommentary,
            personalWork: this.personalWork,
            user: item as User
          }
          console.log(commentary)
          this.commentaryService.createCommentary(commentary).subscribe(() => {
            this.refresh()
            this.txtCommentary = ''
          })
        })
      else
        console.log('Não autenticado')
    }
  }

  refresh() {
    this.commentaryService
      .getCommentaryByPersonalWork(this.personalWork.idPersonalWork!)
      .subscribe((item) => {
        this.commentarys = item as Commentary[]
      })
  }

  deleteCommentary(commentary: Commentary) {
    this.commentaryService.delete(commentary.idCommentary!).subscribe(() => {
      this.refresh()
    })
  }
}
