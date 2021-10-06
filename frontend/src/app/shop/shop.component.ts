import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  category: string = "";

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkCateg();
  }
  
  checkCateg() {
    this.actRoute.paramMap.subscribe(params => {
        this.category = String(params.get('slug'));

        if (this.category == "null") {
          this.category = 'all';
        }

    })
  }

}
