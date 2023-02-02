import { HttpResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { Project } from 'src/app/interfaces/Project'
import { User } from 'src/app/interfaces/User'
import { ProjectService } from 'src/app/services/project.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User
  projects!: Project[]
  userImg: string = '/assets/img/default_profile.png'

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.user && this.user.img)
      this.userService.getImg(this.user.img).subscribe((item) => {
        this.userImg = item
          ? ((item as HttpResponse<Blob>).url as string)
          : '/assets/img/default_profile.png'
      })
    else this.userImg = '/assets/img/default_profile.png'

    this.projectService.getAllByUser(this.user.id!).subscribe((item) => {
      this.projects = item as Project[]
    })
  }
}
