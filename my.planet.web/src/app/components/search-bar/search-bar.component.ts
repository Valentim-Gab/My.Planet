import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>()
  @Input() searchedValue!: string
  @Input() placeholderText!: string

  constructor() {}

  ngOnInit(): void {}

  search() {
    this.onSearch.emit(this.searchedValue.toLowerCase())
  }
}
