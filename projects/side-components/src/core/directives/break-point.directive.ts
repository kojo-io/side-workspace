import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {BreakPointData, BreakPoint} from "./break-point";

@Directive({
  selector: '[sc-breakpoint]'
})
export class BreakpointDirective implements OnInit {
  @HostBinding('class') elementClass = '';
  // @ts-ignore
  @Input('sc-breakpoint') breakpoints: BreakPoint;

  // @Input() delay = 0;

  ngOnInit() {
    this.applyBreakpoint();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.applyBreakpoint();
  }

  private applyBreakpoint() {
    const width = window.innerWidth;

    if (this.breakpoints.small && this.isInRange(width, this.breakpoints.small.range)) {
      this.applyClass(this.breakpoints.small.class);
    } else if (this.breakpoints.medium && this.isInRange(width, this.breakpoints.medium.range)) {
      this.applyClass(this.breakpoints.medium.class);
    } else if (this.breakpoints.large && this.breakpoints.large.range) {
      this.applyClass(this.breakpoints.large.class);
    }
  }

  private applyClass(classes: BreakPointData['class']) {
    if (typeof classes === 'string') {
      this.elementClass = classes;
    } else if (Array.isArray(classes)) {
      this.elementClass = classes.join(' ');
    } else if (typeof classes === 'object') {
       // Join valid classes into a single string
      this.elementClass = Object.keys(classes)
        .filter((cls) => classes[cls]) // Filter only classes with `true` values
        .join(' ');
    }
  }

  private isInRange(width: number, range: string): boolean {
    const [min, max] = range.split('-').map(Number);
    return width >= min && width <= max;
  }
}
