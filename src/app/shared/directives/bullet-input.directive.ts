import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBulletInput]'
})
export class BulletInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    const currentValue = this.el.nativeElement.value;
    this.el.nativeElement.value = '• ' + currentValue;
  }
}
