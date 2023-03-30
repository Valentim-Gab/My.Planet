import { Component, Input, OnInit } from '@angular/core';
import { Commentary } from 'src/app/interfaces/Commentary';
import { User } from 'src/app/interfaces/User';
import { CommentaryService } from 'src/app/services/commentary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent implements OnInit {
  @Input() commentary!: Commentary

  constructor(private commentaryService: CommentaryService) { }

  ngOnInit(): void {
  
  }
}
