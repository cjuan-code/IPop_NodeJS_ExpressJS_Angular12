import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-scroll-categories',
  templateUrl: './scroll-categories.component.html',
  styleUrls: ['./scroll-categories.component.css']
})
export class ScrollCategoriesComponent implements OnInit {

  listCategories: Category[] = [];
  offset: number = 0;
  limit: number = 3;

  constructor(private _categoriesService: CategoriesService) { 
  };

  ngOnInit(): void {
    this.getScrollCategories(0);
  }

  getScrollCategories(scrolled: number) {
    this._categoriesService.getCategories(this.offset, this.limit).subscribe(data => {

      if (scrolled == 0) {
        this.listCategories = data;
      } else if (scrolled == 1) {
        this.listCategories.push.apply(this.listCategories, data);
      }

    }, error => {
        console.log(error);
    })
  }

  onScrollDown() {
    this.offset = this.offset+3;
    this.getScrollCategories(1);
  }

}
