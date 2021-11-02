import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/models/item';
import ItemService from 'src/app/core/services/item.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {

  @Input() slug_item = '';

  itemInfo: Item = {
    slug: '', 
    name: '',
    desc: '',
    price: 0,
    categ: [''],
    ubication: {ubication: ''},
    liked: 0,
    isLiked: false,
    viewed: 0,
    comment: [''],
    author: {username: '', bio: '', profileImg: '', following: false},
    wear: '',
    state: '',
    shipping: false,
    img: ['']
  };

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this._itemService.getItem(this.slug_item).subscribe(data => {
      this.itemInfo = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  onToggleFavorite(favorited: boolean) {
    this.itemInfo.isLiked = favorited;

    if (favorited) {
      this.itemInfo.liked++;
    } else {
      this.itemInfo.liked--;
    }
}
}
