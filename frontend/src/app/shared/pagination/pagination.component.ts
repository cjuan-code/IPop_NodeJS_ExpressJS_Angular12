import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  set numpages(numpages: number) {
    this.pages = [];
    for (let i = 0; i < numpages; i++) {
      this.pages.push(i+1);
    }
    // console.log(this.pages[this.pages.length-1]);
  }
  @Output() change_numpage = new EventEmitter<number>();

  pages: number[] = [];
  currentPage : number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changePage(page: number) {
    this.currentPage = page;
    this.change_numpage.emit(page);
  }

}
