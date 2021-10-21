import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/models/category';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() filter = new EventEmitter();

  allCategories: any;
  filterForm = new FormGroup({
    category: new FormControl(''),
    shipping: new FormControl('')
  });

  constructor(private _categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getAllCategories().subscribe(data => {
      this.allCategories = data;
    }, error => {
      console.log(error);
    })

  }

  onSubmit() {
    this.filter.emit(this.filterForm.value);
  }

}
