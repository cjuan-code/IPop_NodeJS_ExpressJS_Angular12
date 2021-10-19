import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  category: string = "";
  slug_item: string = "";
  search: string = "";
  currentRoute: string = "";
  shop: boolean = false;
  details_shop: boolean = false;

  constructor(private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    if (this.currentRoute.startsWith('/shop/item')) {
      this.listDetails();
      this.details_shop = true;
    } else if (this.currentRoute.startsWith('/shop/search')) {
      this.listSearch();
      this.shop = true;
    } else {
      this.listCateg();
      this.shop = true;
    }

  }
  
  listCateg() {
    this.actRoute.paramMap.subscribe(params => {

      this.category = String(params.get('slug'));

      if (this.category == "null") {
        this.category = 'all';
      }

    })
  }

  listDetails() {
    this.actRoute.paramMap.subscribe(params => {
      this.slug_item = String(params.get('slug'));
    })
  }

  listSearch() {
    this.actRoute.paramMap.subscribe(params => {
      this.search = String(params.get('data'));
    })
  }

}
