import { Component, Input, OnInit } from '@angular/core';
import { Commentary } from 'src/app/interfaces/Commentary';
import { CommentaryService } from 'src/app/services/commentary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  @Input() idPersonalWork!: number
  commentarys!: Commentary[]
  commentary!: Commentary

  constructor(private commentaryService: CommentaryService, public userService: UserService) { }

  ngOnInit(): void {
    this.commentaryService.getCommentaryByPersonalWork(this.idPersonalWork).subscribe(item => {
      this.commentarys = item as Commentary[]
    })
  }

  

}
