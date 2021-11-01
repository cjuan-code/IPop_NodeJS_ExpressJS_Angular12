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

  itemInfo: Item[] = [];

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this._itemService.getItem(this.slug_item).subscribe(data => {
      this.itemInfo = data;
      console.log(this.itemInfo[0]);
    }, error => {
      console.log(error);
    })
  }

  onToggleFavorite(favorited: boolean) {
    this.itemInfo[0].isLiked = favorited;

    if (favorited) {
      this.itemInfo[0].liked++;
    } else {
      this.itemInfo[0].liked--;
    }
}
}
