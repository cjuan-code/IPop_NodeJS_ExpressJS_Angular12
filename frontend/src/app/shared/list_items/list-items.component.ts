import { Component, Input, OnInit } from "@angular/core";
import { Item } from '../../core/models/item';
import { ItemService } from "../../core/services/item.service";

@Component({
    selector: 'app-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit {

    @Input() category = '';

    listItems: Item[] = [];

    constructor ( private _itemService: ItemService) {};
    
    ngOnInit(): void {
        this.checkIfCateg();
    }
    
    getAllItems() {
        this._itemService.getItems().subscribe(data => {
            this.listItems = data;
        }, error => {
            console.log(error);
        })
    }

    checkIfCateg() {
        if (this.category == "all") {
            this.getAllItems();
        } else {
            this._itemService.getItemsByCat(this.category).subscribe(data => {
                this.listItems = data;
            }, error => {
                console.log(error);
            })
        }
    }
}
