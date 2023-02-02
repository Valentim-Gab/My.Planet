import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  searchedValue: string = ''
  users!: User[]
  searchedUsers!: User[]
  noUsers: boolean = false

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.searchedValue = this.route.snapshot.queryParamMap.get(
      'pesquisa'
    ) as string
    this.userService.getAll().subscribe((item) => {
      this.filterUsersSearched(item as User[])
    })
  }

  filterUsersSearched(users: User[]) {
    this.users = users
    this.searchedUsers = users
    if (this.searchedValue)
      this.searchedUsers = this.users.filter((user) => {
        return user
          .username!.toLowerCase()
          .includes(this.searchedValue.toLowerCase())
      })
    this.noUsers = (this.searchedUsers.length > 0) ? false : true
  }

  search(event: String) {
    this.searchedUsers = this.users.filter((user) => {
      return user.username
        ?.toLowerCase()
        .includes((event as string).toLowerCase())
    })
    this.noUsers = (this.searchedUsers.length > 0) ? false : true
  }
}
