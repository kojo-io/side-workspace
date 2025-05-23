import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {arrow, computePosition, flip, offset, shift} from "@floating-ui/dom";

@Directive({
  selector: '[popOver]',
  standalone: true
})
export class PopOverDirective {
  @Input() innerHTML!: HTMLElement;
  @Input() position : 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' = 'bottom';
  @Input() padding = 6;
  @Input() offSet = 6;

  element!: HTMLElement;
  arrowElement!: HTMLElement;

  constructor(private el: ElementRef) { }

  popOver() {
    computePosition(this.el.nativeElement, this.element, {
      placement: this.position,
      middleware: [
        flip(),
        offset(this.offSet),
        shift({padding: this.padding}),
        arrow({element: this.arrowElement}),
      ]
    }).then(({x, y, placement, middlewareData}) => {
      Object.assign(this.element.style, {
        left: `${x}px`,
        top: `${y}px`
      });

      // @ts-ignore
      const {x: arrowX, y: arrowY} = middlewareData.arrow;

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];

      Object.assign(this.arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        // @ts-ignore
        [staticSide]: '-4px',
      });
    })
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    this.element = document.createElement('div');
    this.arrowElement = document.createElement('div');
    this.element.role = 'tooltip';
    this.element.classList.add('max-w-max', 'max-h-max', 'absolute', 'top-0', 'bottom-0', 'bg-[#0C111D]', 'text-white', 'font-[600]', 'leading-[18px]', 'px-[12px]', 'py-[8px]' ,'rounded-[8px]', 'text-[12px]', 'z-[999]');
    this.arrowElement.classList.add('absolute', 'bg-[#0C111D]', 'w-[8px]', 'h-[8px]', 'rotate-45', 'z-[999]');
    document.body.appendChild(this.element);
    this.element.appendChild(this.innerHTML);
    this.element.appendChild(this.arrowElement);
    this.popOver();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.element.removeChild(this.innerHTML);
    document.body.removeChild(this.element);
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.element.removeChild(this.innerHTML);
    document.body.removeChild(this.element);
  }
}

