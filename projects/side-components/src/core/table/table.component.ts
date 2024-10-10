import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'sc-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit{

  @ViewChild('tablePaginate', {static: false}) paginate?: PaginationComponent;
  @Input() data: any[] = [];
  @Input() fullScreen: boolean = false;
  @Input() usePagination = false;
  @Input() border = false;
  @Input() rounded = false;
  @Input() shadow = false;
  @Input() showPageLinks: boolean = true;
  @Input() showPageOptions: boolean = true;
  @Input() showCurrentPageInfo: boolean = false;
  @Input() currentPageInfoTemplate?: string;
  @Input() pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  @Input() paginationPosition : 'top-left' | 'top-right' | 'top-center' | 'bottom-center' | 'bottom-left' | 'bottom-right' = 'top-right';
  cd = inject(ChangeDetectorRef);
  mainData: any[] = [];
  image: any;
  @Input() currentPage: number = 1;
  @Input() currentPageSize: number = 10;
  @Input() totalPages = 0;
  first = 0;
  last = 0;

  calcPagination = () => {
    if (this.usePagination) {
      if (this.paginate) {
        this.mainData = this.data.slice(this.paginate.first === 1 ? 0 : this.paginate.first, this.paginate.last > this.paginate.currentPageSize ? this.paginate.last + 1 : this.paginate.last);
      }
    } else {
      this.mainData = this.data;
    }
    this.cd.detectChanges();
  }

  pageNumberChangeEvent = (event: number) => {
    this.currentPage = event;
    this.calcPagination();
  }

  pageSizeChangeEvent = (event: number) => {
    this.currentPageSize = event;
    this.calcPagination();
  }

  sort(field: string, order: 'asc' | 'dsc' = 'asc') {

    let compareASC = (a: any, b: any) => {
      let aValue;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));

        return aValue?.localeCompare(bValue);
      } else {
        return a[field].localeCompare(b[field])
      }
    }

    let compareDSC = (a: any, b: any) => {
      let aValue ;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));
        return bValue?.localeCompare(aValue);
      } else {
        return b[field].localeCompare(a[field])
      }
    }

    if (order === 'asc') {
      this.data.sort(compareASC);
    } else {
      this.data.sort(compareDSC);
    }
    this.calcPagination();
  }

  sortNumber(field: string, order: 'asc' | 'dsc' = 'asc') {

    let compareASC = (a: any, b: any) => {
      let aValue;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));
        return parseFloat(aValue) - parseFloat(bValue);
      } else {
        return parseFloat(a[field]) - parseFloat(b[field]);
      }
    }

    let compareDSC = (a: any, b: any) => {
      let aValue ;
      let bValue;

      if (field.includes('.')) {
        aValue = this.getValue(a, field.split('.'));
        bValue = this.getValue(b, field.split('.'));
        return parseFloat(bValue) - parseFloat(aValue);
      } else {
        return parseFloat(b[field]) - parseFloat(a[field]);
      }
    }

    if (order === 'asc') {
      this.data.sort(compareASC);
    } else {
      this.data.sort(compareDSC);
    }
    this.calcPagination();
  }

  getValue = (item: any ,value: any[]):any => {
    let result;
    for (let i = 0; i < value.length; i++) {
      if (!result) {
        result = item?.[value[i]]
      } else {
        result = result?.[value[i]]
      }
    }
    return result;
  }

  ngOnInit(): void {
    this.calcPagination();
  }
}
