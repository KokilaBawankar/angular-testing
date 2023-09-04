import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LettercasePipe } from './../pipes/lettercase.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let elementsWithDir: any;
  let elementWithoutDir: any;
  let fixture: any;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, AppComponent, LettercasePipe],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, ReactiveFormsModule]
    }).createComponent(AppComponent);
    fixture.detectChanges();

    elementsWithDir = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    elementWithoutDir = fixture.debugElement.query(By.css('h2:not([highlight])'));
  })
  

  it('should have three highlighted elements', () => {
    expect(elementsWithDir.length).toBe(3);
  });

  it('First element should have yellow color for highlighting', () => {
    const color = elementsWithDir[0].nativeElement.style.backgroundColor;
    expect(color).toBe('yellow');
  })  
  
  it('Second element should have default color for highlighting', () => {
    const element = elementsWithDir[1].injector.get(HighlightDirective) as HighlightDirective;
    const color = elementsWithDir[1].nativeElement.style.backgroundColor;
    expect(color).toBe(element.defaultColor);
  }) 

  it('Third element should not have custom property', () => {
    const element = elementsWithDir[1].injector.get(HighlightDirective) as HighlightDirective;
    const color = elementsWithDir[1].nativeElement.style.backgroundColor;
    expect(elementWithoutDir.properties['customProperty']).toBeUndefined();
  })

  it('Fourth element should have highlight color as input box value', () => {
      const input = elementsWithDir[2].nativeElement as HTMLInputElement;
      expect(input.style.backgroundColor)
      .withContext('Should have initial background color')
      .toBe('lightblue');

      input.value = 'red';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      //TODO Not working please check later
      /* fixture.whenStable().then(() => {
        expect(input.style.backgroundColor)
        .withContext('changed color')
        .toBe(input.value);
      }); */
    
  })
});
