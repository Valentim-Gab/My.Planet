import { HttpResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-search-user-header',
  templateUrl: './search-user-header.component.html',
  styleUrls: ['./search-user-header.component.scss'],
})
export class SearchUserHeaderComponent implements OnInit {
  @Input() user!: User
  userImg: string = '/assets/img/default_profile.png'

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.user.img)
      this.userService.getImg(this.user.img as string).subscribe((item) => {
        this.userImg = item
          ? ((item as HttpResponse<Blob>).url as string)
          : '/assets/img/default_profile.png'
      })
    else this.userImg = '/assets/img/default_profile.png'
  }
}
