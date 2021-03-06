import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories-carousel',
  templateUrl: './categories-carousel.component.html',
  styleUrls: ['./categories-carousel.component.css']
})
export class CategoriesCarouselComponent implements OnInit {

  carouselCategories: Category[] = [];

  constructor(private _categoriesService: CategoriesService) { };

  ngOnInit(): void {
    this.getCarouselCategories();
  }

  getCarouselCategories() {
    this._categoriesService.getCategories(0, 2).subscribe(data => {
      this.carouselCategories = data;
    }, error => {
      console.log(error);
    })
  }

}
