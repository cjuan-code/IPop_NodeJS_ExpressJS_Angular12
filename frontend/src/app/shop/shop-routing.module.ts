import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

const routes: Routes = [
    {path: '', component: ShopComponent},
    {path: ':slug', component: ShopComponent},
    {path: 'item/:slug', component: ShopComponent},
    {path: 'search/:data', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }