import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  
  defaultColor = 'gray';
  @Input('appHighlight') bgColor: string = '';

  constructor(private elementRef: ElementRef) { 
    elementRef.nativeElement.style.customProperty = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;   
  }

}
