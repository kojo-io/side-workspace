import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownDirective} from "./drop-down.directive";
import { TooltipDirective } from './tooltip.directive';
import {DropDownItemDirective} from "./drop-down-item.directive";
import {BreakpointDirective} from "./break-point.directive";



@NgModule({
  declarations: [
    DropDownDirective,
    TooltipDirective,
    DropDownItemDirective,
    BreakpointDirective
  ],
  exports: [
    DropDownDirective,
    TooltipDirective,
    DropDownItemDirective,
    BreakpointDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
