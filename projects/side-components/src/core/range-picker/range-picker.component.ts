import {AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'swap-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrl: './range-picker.component.css'
})
export class RangePickerComponent implements AfterViewInit {
  @Input() minValue = 20; // Initial min thumb position
  @Input() maxValue = 80; // Initial max thumb position
  @Input() min = 0; // Minimum allowed value
  @Input() max = 100; // Maximum allowed value

  @Output() minValueChange = new EventEmitter<number>();
  @Output() maxValueChange = new EventEmitter<number>();

  @ViewChild('rangeTrack') rangeTrack!: ElementRef;

  private dragging: 'min' | 'max' | null = null;
  private trackRect!: DOMRect;

  constructor() {}

  ngAfterViewInit() {
    this.trackRect = this.rangeTrack.nativeElement.getBoundingClientRect();
  }

  onMouseDown(type: 'min' | 'max', event: MouseEvent) {
    this.dragging = type;
    this.trackRect = this.rangeTrack.nativeElement.getBoundingClientRect();

    const onMouseMove = (e: MouseEvent) => {
      if (!this.dragging) return;

      // Calculate percentage based on mouse position
      const percent = ((e.clientX - this.trackRect.left) / this.trackRect.width) * 100;
      const newValue = Math.round(this.min + (percent * (this.max - this.min)) / 100);

      if (this.dragging === 'min' && newValue < this.maxValue) {
        this.minValue = Math.max(this.min, newValue);
        this.minValueChange.emit(this.minValue);
      } else if (this.dragging === 'max' && newValue > this.minValue) {
        this.maxValue = Math.min(this.max, newValue);
        this.maxValueChange.emit(this.maxValue);
      }

    };

    const onMouseUp = () => {
      this.dragging = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  getPercentage(type: 'min' | 'max'): string {
    const value = type === 'min' ? this.minValue : this.maxValue;
    return ((value - this.min) / (this.max - this.min)) * 100 + '%';
  }
}
