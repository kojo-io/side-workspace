import {AfterViewInit, Directive, ElementRef, HostListener, Input, Output} from '@angular/core';
import {computePosition, flip, offset} from "@floating-ui/dom";

@Directive({
  selector: '[DropDown]'
})
export class DropDownDirective implements AfterViewInit{
  @Input() menu!: HTMLElement;
  @Input() position : 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' = 'bottom-end';
  @Input() padding = 0;
  @Input() offSet = 6;
  @Input() disabled = false;
  constructor(private el: ElementRef) { }

  contextMenu() {
    computePosition(this.el.nativeElement, this.menu, {
      placement: this.position,
      middleware: [
        flip(),
        offset(this.offSet)
      ]
    }).then(({x, y}) => {
      Object.assign(this.menu.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    })
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', (_) => {
      const ele = document.getElementsByClassName('dropdown-menu-list');
      for (let i = 0; i< ele.length;i++) {
        if (!ele.item(i)?.classList.contains('hidden')) {
          ele.item(i)?.classList.add('hidden')
        }
      }
    })
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.disabled) return;
    event.stopImmediatePropagation();
    const ele = document.getElementsByClassName('dropdown-menu-list');
    for (let i = 0; i< ele.length;i++) {
      if (!ele.item(i)?.classList.contains('hidden')) {
        ele.item(i)?.classList.add('hidden');
      }
    }
    this.menu.classList.toggle('hidden');
    this.contextMenu();
  }

  @HostListener('window:resize')
  onResize() {
    this.contextMenu();
  }
}
