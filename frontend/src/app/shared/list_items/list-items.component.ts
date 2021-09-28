import { Component, OnInit } from "@angular/core";
import { Item } from '../../core/models/item';
import { ItemService } from "../../core/services/item.service";

@Component({
    selector: 'app-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

    listItems: Item[] = [];

    constructor ( private _itemService: ItemService) {};
    
    ngOnInit(): void {
        this.getAllItems();
    }
    
    getAllItems() {
        this._itemService.getItems().subscribe(data => {
            this.listItems = data;
            console.log(this.listItems);
        }, error => {
            console.log(error);
        })
    }
}
