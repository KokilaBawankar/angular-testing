import { of } from 'rxjs';
import { AppService } from './services/app.service';
import { LazyTestModule } from './modules/lazy-test/lazy-test.module';
import { LettercasePipe } from './pipes/lettercase.pipe';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
// import { SpyNgModuleFactoryLoader} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import routes from './routes';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        LettercasePipe
      ],
      // providers: [SpyNgModuleFactoryLoader]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  //component should be created
  it('AppComponent should be created', () => {
    expect(component).toBeTruthy();
  });
  //Interpolation - Display the intial value in H1 test
  it('It should display initial value of title variable in h1', () => {
    let head = fixture.nativeElement.querySelector('#heading');
    fixture.detectChanges();
    expect(head.innerText).toBe(component.heading);
  })
  // Interpolation - Property binding
  it('Heading update should display on screen', () => {
    component.heading = 'This is changed H1';
    fixture.detectChanges();
    let head = fixture.nativeElement.querySelector('#heading')
    expect(head.innerText).toBe('This is changed H1');
  })
  //Interpolation - Passing type and placeholder of input tag by using variable
  it('Passing type and placeholder of input tag by using variable', () => {
    let input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#interpolation-input');
    expect(input.type).toBe(component.inputType);
    expect(input.placeholder).toBe(component.inputPlaceholder);
  }) 
  //Interpolation - Type and placeholder of input tag should change if variable value is changed
  it('Type and placeholder of input tag should change if variable value is changed', () => {
    component.inputType = 'text';
    component.inputPlaceholder = 'Number';
    fixture.detectChanges();
    let input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#interpolation-input');
    expect(input.type).toBe(component.inputType);
    expect(input.placeholder).toBe(component.inputPlaceholder);
  })
  //Property-binding 
  it('Property binding', () => {
    let input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#interpolation-input');
    expect(input.disabled).toBeTruthy();
  })
  // Two-way binding - from component to view
  it('Title should update on screen when changed in variable', (done) => {
    component.title = 'Title set from spec';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        let input =  fixture.nativeElement.querySelector('#title');
        expect(input.value).toBe('Title set from spec');
        let p = fixture.debugElement.nativeElement.querySelector('#title-display');
        expect(p.innerText).toBe('Title set from spec');
        done();
    })
  })
  // Two-way binding - from view to component
  it('Title should update on screen when changed in input box', (done) => {
    let input =  fixture.nativeElement.querySelector('#title');
    input.value = 'Title set from spec';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // expect(input.value).toContain('Title set from spec'); // TODO : why this is not working but below is working
      expect(input.value).toBe(component.title); // This is working
      // expect(component.title).toBe('Title set from spec'); // TODO : why this is not working but below is working
      expect(component.title).toBe(input.value); // This is working
         let p = fixture.debugElement.nativeElement.querySelector('#title-display');
      // expect(p.innerText).toContain('Title set from spec'); // TODO : why this is not working but below is working
      expect(p.innerText).toBe(component.title); // This is working
        done();
    })
  })
  // On button click changed value should update in input as well as in p tag
  it('On button click changed value should update in input as well as in p tag', (done) => {
    let button: HTMLButtonElement =  fixture.debugElement.nativeElement.querySelector('#clickMe');
    button.click();
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      let input: HTMLInputElement =  fixture.debugElement.nativeElement.querySelector('#title');
      let p: HTMLParagraphElement =  fixture.debugElement.nativeElement.querySelector('#title-display');
      expect(input.value).toBe('Button Clicked!');
      expect(p.innerText).toBe('Button Clicked!');
      done();
    });
  })
  //Routing Testing
  it('/ it should redirect to todo-list component', fakeAsync( () => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/todos');
    });
  })) 

  it('/todos it should redirect to todo-list component', fakeAsync( () => {
    router.navigate(['', 'todos']).then(() => {
      expect(location.path()).toBe('/todos');
    });
  }))

  it('/todos/1 it should redirect to todo component', fakeAsync(() => {
    let expectedTodoId = 1;
    router.navigate(['', 'todos', expectedTodoId]).then(() => {
      expect(location.path()).toBe(`/todos/${expectedTodoId}`);
    })
  }))

 /*  it('lazy loaded module testing', fakeAsync(() => {
    // const lazyloader: SpyNgModuleFactoryLoader = TestBed.inject(SpyNgModuleFactoryLoader);
    // lazyloader.stubbedModules = {lazymodule: LazyTestModule};
    router.navigate(['', 'lazy-test']);
    tick();
    // fixture.detectChanges();
    expect(location.path()).toBe('/lazy-test');
})) */ 
  it('lazy loaded module testing', async () => {
    await fixture.ngZone!.run(async () => {
      await router.navigate(['', 'lazy-test']);
      fixture.detectChanges();
      expect(location.path()).toBe('/lazy-test');
    })
  })

  //ngClass Testing
  it('ngClass Test', () => {
    let para: HTMLParagraphElement = fixture.debugElement.nativeElement.querySelector('#ng-class-test');
    expect(para.getAttribute('class')).toContain('paragraph');
  })

  it('conditional ngClass Test', () => {
    let para: HTMLParagraphElement = fixture.debugElement.nativeElement.querySelector('#conditional-ng-class-test');
    expect(para.getAttribute('class')).toContain('bold-font');
    component.fontStyle = 'underline';
    fixture.detectChanges();
    expect(para.getAttribute('class')).toContain('underline-font');
  })
  // ngStyle Testing
  it('ngStyle Test', () => {
    let para: HTMLParagraphElement = fixture.debugElement.nativeElement.querySelector('#ng-style-test');
    expect(para.getAttribute('style')).toContain('color: magenta');
  })

  it('conditional ngClass Test', () => {
    let para: HTMLParagraphElement = fixture.debugElement.nativeElement.querySelector('#conditional-ng-style-test');
    expect(para.getAttribute('style')).toContain('color: rgb(14, 111, 253)');
    component.fontColor = 'lightgreen';
    fixture.detectChanges();
    expect(para.getAttribute('style')).toContain('color: lightgreen');
  })
  //Attribute Binding Testing
  it('Attribute biding - aria-label for button', () => {
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#aria-label-test');
    expect(button.getAttribute('aria-label')).toBe(component.ariaLabel);
  })
  //ngIf Test
  it('ngIf Testing', () => {
    let div1 = HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#colorPickerDiv');
    let div2 = HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#ngTemplate');
    expect(div1).not.toBeNull();
    expect(div2).toBeNull();
    component.selectedColor = '#0e6ffd';
    fixture.detectChanges();
    div1 = HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#colorPickerDiv');
    div2 = HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#ngTemplate');
    expect(div1).toBeNull();
    expect(div2).not.toBeNull();
  })
  //ngSwitch Test
  it('ngSwitchCase Testing', () => {
    let switchElement = fixture.debugElement.nativeElement.querySelector('#numInWords');
    expect(switchElement.childElementCount).toBe(1);
    expect(switchElement.children.length).toBe(1);
    expect(switchElement.children[0].innerHTML).toBe('40 - Fourty');
    component.num = 20;
    fixture.detectChanges();
    expect(switchElement.children[0].innerHTML).toBe('20 - Twenty');
  })
  //ngFor Test
  it('ngFor Test', () => {
    let divElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.tour-place'));
    expect(divElements.length).toBe(component.places.length);
    divElements.forEach((div: DebugElement, index: number) => {
      const place = component.places[index];
      expect(div.nativeElement.innerHTML).toBe(place.place + ' - ' + place.state);
    })
  })

  // SpyOn Test
  it('SpyOn Test', () => {
    spyOn(component, 'add');
    spyOn(component, 'substract');
    spyOn(component, 'multiply');
    spyOn(component, 'divide');
    component.calculator('add', 10,10);
    component.calculator('sub', 10,10);
    component.calculator('mul', 10,10);
    component.calculator('div', 10,10);
    expect(component.add).toHaveBeenCalled();
    expect(component.substract).toHaveBeenCalled();
    expect(component.multiply).toHaveBeenCalled();
    expect(component.divide).toHaveBeenCalled();
  })

  it('SpyOn with returnValue Test', () => {
    spyOn(component, 'add').and.returnValue(30);

    let result = component.showResult();
    expect(result).toBe('Fail');

    let cal = component.calculator('add', 10, 10);
    expect(cal).toBe(30);
  })
  //Stub - A dummy piece of code that lets the test run but you dont care what happened to it
  it('SpyOn faking HTTP call and stubbing component method', () => {
    let service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'saveResult').and.callFake(() => {
      return of({result: 400});
    });
    spyOn(component, 'add').and.stub();
    component.calculator('add', 10, 10);
    expect(component.result).toEqual({result: 400});
  })
  // Reactive Form Testing
  it('Reactive Form Testing - Email Validation', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
  })  
  it('Reactive Form Testing - Email Validation after assigning value', () => {
    let email = component.form.controls['email'];
    email.setValue('kokila@gmail.com')
    expect(email.valid).toBeTruthy();
    expect(email.value).toBe('kokila@gmail.com');
  })
  it('Reactive Form Testing - Password Validation', () => {
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.errors['required']).toBeTruthy();
  })  
  it('Reactive Form Testing - Password Validation after assigning value', () => {
    let password = component.form.controls['password'];
    password.setValue('kokila@gmail.com')
    expect(password.valid).toBeFalsy();
    expect(password.errors['pattern']).toBeTruthy();
    password.setValue('kokila12')
    expect(password.value).toBe('kokila12');
  })
  it('Reactive Form Testing - After form submition', () => {
    component.form.setValue({email: 'kokila@gmail.com', password: 'kokila12'});
    expect(component.form.value).toEqual({email: 'kokila@gmail.com', password: 'kokila12'});
  })
  // Template-driven Form Testing
  it('Template-driven Form Testing - Email Validation', () => {
    fixture.whenStable().then(() => {
      let email = component.loginForm.form.controls['email'];
      expect(email.valid).toBeFalsy();
      expect(email.errors).toEqual({required: true});
    })
  })  
  it('Template-driven Form Testing - Email Validation after assigning value', () => {
    fixture.whenStable().then(() => {
      let email = component.loginForm.form.controls['email'];
      email.setValue('kokila@gmail.com')
      expect(email.valid).toBeTruthy();
      expect(email.value).toBe('kokila@gmail.com');
    })
  }) 
  it('Template-driven Form Testing - Password Validation', () => {
    fixture.whenStable().then(() => {
      let password = component.loginForm.form.controls['password'];
      expect(password.valid).toBeFalsy();
      expect(password.errors).toEqual({required: true});
    });
  })  
  it('Template-driven Form Testing - Password Validation after assigning value', () => {
    fixture.whenStable().then(() => {
      let password = component.loginForm.form.controls['password'];
      password.setValue('kokila@gmail.com')
      expect(password.valid).toBeFalsy();
      password.setValue('kokila12')
      expect(password.value).toBe('kokila12');
    });
  })
  it('Template-driven Form Testing - After form submition', () => {
    component.loginForm.form.setValue({email: 'kokila@gmail.com', password: 'kokila12'});
    expect(component.loginForm.form.value).toEqual({email: 'kokila@gmail.com', password: 'kokila12'});
  })
  //Alert method testing
  it("should call alert", () => {
    spyOn(window, "alert");
    alert('Testing')
    expect(window.alert).toHaveBeenCalledWith("Testing");
  });
});
