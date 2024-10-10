import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrDirective} from "./directives/tr.directive";
import {TableDirective} from "./directives/table.directive";
import {TdDirective} from "./directives/td.directive";
import {ThDirective} from "./directives/th.directive";
import {TheadDirective} from "./directives/thead.directive";
import {TableComponent} from "./table.component";
import {PaginationModule} from "../pagination/pagination.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TableComponent,
    TrDirective,
    TableDirective,
    TdDirective,
    ThDirective,
    TheadDirective
  ],
  exports: [
    TableComponent,
    TheadDirective,
    ThDirective,
    TrDirective,
    TdDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule
  ]
})

export class TableModule { }
