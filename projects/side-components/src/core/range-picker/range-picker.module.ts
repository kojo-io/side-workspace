import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePickerComponent } from './range-picker.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RangePickerComponent
  ],
  exports: [
    RangePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RangePickerModule { }
