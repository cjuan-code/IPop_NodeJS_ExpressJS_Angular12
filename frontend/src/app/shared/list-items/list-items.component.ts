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
    numpages: number = 0;
    currentPage: number = 0;
    limit: number = 3;
    offset: number = 0;

    constructor ( private _itemService: ItemService) {};
    
    ngOnInit(): void {
        this.checkIfCateg();
        this.changePage(1);
    }
    
    getAllItems() {
        this._itemService.getItems().subscribe(data => {
            this.calculatePages(data);
        }, error => {
            console.log(error);
        })
    }

    checkIfCateg() {
        if (this.category == "all") {
            this.getAllItems();
        } else {
            this._itemService.getItemsByCat(this.category).subscribe(data => {
                this.calculatePages(data);
            }, error => {
                console.log(error);
            })
        }
    }

    calculatePages(data: []) {
        this.numpages = Math.ceil((data.length/3));
    }

    changePage(page: any) {

        if (page == 1) {
            this.offset = 0;
        } else if (this.currentPage < page) {
            this.offset = this.offset + 3;
        } else if (this.currentPage > page) {
            this.offset = this.offset - 3;
        }

        this.currentPage = page;

        this._itemService.getItemsPag(this.offset, this.limit, this.category).subscribe(data => {
            this.listItems = data;
        })        
    }
}
