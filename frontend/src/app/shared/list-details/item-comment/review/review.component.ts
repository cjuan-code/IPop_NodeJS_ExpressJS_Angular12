import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  @Output() toggle = new EventEmitter<Number>();

  @Input() stars: Number = 0;

  @Input() fixed: Boolean = false;

  constructor() { }

  reviewed(event: any) {
    this.toggle.emit(event.target.value);
  }

}
