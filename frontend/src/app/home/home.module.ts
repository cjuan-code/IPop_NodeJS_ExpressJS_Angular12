import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { CategoriesCarouselComponent } from './categories-carousel/categories-carousel.component';
import { ScrollCategoriesComponent } from './scroll-categories/scroll-categories.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriesCarouselComponent,
    ScrollCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
