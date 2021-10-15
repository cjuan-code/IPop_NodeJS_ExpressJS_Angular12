import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { RouterModule } from '@angular/router';
import { ListDetailsComponent } from './list-details/list-details.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListItemsComponent,
    ListDetailsComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ListItemsComponent,
    ListDetailsComponent,
    PaginationComponent
  ],
})
export class SharedModule { }
