import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';


@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent implements OnChanges {
  formattedErrors: Array<string> = [];
  errorList: any;

  @Input() errors: Array<string> = [];
  // set errors(errorList: Errors) {

  //   this.formattedErrors = Object.keys(errorList.errors || {})
  //     .map(key => `${key} ${errorList.errors[key]}`);
  //     console.log(this.formattedErrors);
  // }

  // get errorList() { return this.formattedErrors; }

  ngOnChanges() {
    this.formatErrors();
  }

  formatErrors() {
    this.errorList = [this.errors];
  }


  trackByFn(index: any, item: any) {
    return index;
  }
}