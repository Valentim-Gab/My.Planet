import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent implements OnInit {
  @Input() class: string = ''
  @Input() active: boolean = false
  @Input() category!: Category

  constructor() { }

  ngOnInit(): void {
  }

  filterByCategory() {
    
  }
}
