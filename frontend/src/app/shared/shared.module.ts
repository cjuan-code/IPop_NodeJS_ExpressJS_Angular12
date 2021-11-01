import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { RouterModule } from '@angular/router';
import { ListDetailsComponent } from './list-details/list-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowAuthedDirective } from './show-authed.directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListItemsComponent,
    ListDetailsComponent,
    PaginationComponent,
    SearchComponent,
    FiltersComponent,
    ListErrorsComponent,
    FavoriteButtonComponent,
    ShowAuthedDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ListItemsComponent,
    ListDetailsComponent,
    ListErrorsComponent,
    FavoriteButtonComponent,
    ShowAuthedDirective
  ],
})
export class SharedModule { }
