import { HttpResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { PersonalWork } from 'src/app/interfaces/PersonalWork'
import { User } from 'src/app/interfaces/User'
import { PersonalWorkService } from 'src/app/services/personal-works.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User
  personalWorks!: PersonalWork[]
  userImg: string = '/assets/img/default_profile.png'

  constructor(
    private personalWorkService: PersonalWorkService,
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

    this.personalWorkService.getAllByUser(this.user.id!).subscribe((item) => {
      this.personalWorks = item as PersonalWork[]
    })
  }
}
