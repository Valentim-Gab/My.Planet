import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';
import { categoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dropdown-categories',
  templateUrl: './dropdown-categories.component.html',
  styleUrls: ['./dropdown-categories.component.scss']
})
export class DropdownCategoriesComponent implements OnInit {
  @Output() emitCategoryName: EventEmitter<Category> = new EventEmitter<Category>()
  @Input() category: Category | null = null
  categories: Category[] = []
  showCategoriesDrop: boolean = false
  title: string = 'Categorias'

  constructor(private categoryService: categoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(item => {
      this.categories = item as Category[]
    })
  }

  showCategories(action: boolean) {
    this.showCategoriesDrop = action
  }

  emitCategory(category: Category) {
    this.showCategories(false)
    this.title = category.nameCategory
    this.emitCategoryName.emit(category)
  }
}
