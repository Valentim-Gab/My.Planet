import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Commentary } from 'src/app/interfaces/Commentary'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { User } from 'src/app/interfaces/User'
import { JwtService } from 'src/app/security/jwt.service'
import { CommentaryService } from 'src/app/services/commentary.service'
import { MessagesService } from 'src/app/services/messages.service'
import { UserService } from 'src/app/services/user.service'
import { FormButtonComponent } from '../form-button/form-button.component'

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
    private jwtService: JwtService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh()
  }

  comment(comments: HTMLDivElement) {
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
            this.ngAfterViewInit(true, comments)
            this.txtCommentary = ''
          })
        })
      else {
        this.messageService.addError('Nescessita login')
        this.router.navigate(['/login'])
        window.scrollTo(0, 0);
      }
    }
  }

  refresh() {
    this.commentaryService
      .getCommentaryByPersonalWork(this.personalWork.idPersonalWork!)
      .subscribe((item) => {
        this.commentarys = item as Commentary[]
    })
  }

  ngAfterViewInit(scroll: boolean, div?: HTMLDivElement) {
    this.commentaryService
      .getCommentaryByPersonalWork(this.personalWork.idPersonalWork!)
      .subscribe((item) => {
        this.commentarys = item as Commentary[];
        setTimeout(() => {
          div!.scrollTo(0, div!.scrollHeight);
        }, 0);
      });
  }

  deleteCommentary(commentary: Commentary) {
    this.commentaryService.delete(commentary.idCommentary!).subscribe(() => {
      this.refresh()
    })
  }
}
