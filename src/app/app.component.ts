import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavigationEnd, Router, ParamMap } from '@angular/router';

import {AppService} from './services/app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-testing';
  heading = 'This is h1';
  inputType = 'number';
  inputPlaceholder = 'Enter Number';
  disabled: boolean = true;
  fontStyle: string = 'bold';
  fontColor: string = 'blue';
  ariaLabel:  string = 'This is a save button to submit the form.';
  shops: any;
  posts: any;
  selectedShop: string = '';
  selectedTodo: number = 0;
  color: string = 'lightblue';
  selectedColor: string = '';
  num: number = 40;
  places: {place: string, state: string}[] = [];
  result: any;
  form: any;
  isSubmitted: boolean = false;
  model = {email: '', password: ''};
  @ViewChild(NgForm) loginForm!: NgForm;

  constructor( private appService: AppService,
               private router: Router) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.selectedTodo = parseInt(val.url.split('/').slice(-1)[0]);
      }
    });

  }

  ngOnInit() {
    this.shops = this.appService.shops;
    this.places = [
      {place: 'Ajanta Caves', state:'Maharashtra'},
      {place: 'Dudhsagar Waterfall', state:'Goa'},
      {place: 'Sun Temple', state:'Odisha'},
      {place: 'Munnar', state:'Kerla'}
    ];
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{8}$')])
    });
  }

  onClick() {
    this.title = 'Button Clicked!'
  }

  getPosts() {
    this.appService.getPosts().subscribe((data: any) => this.posts = data.slice(0,5));
  }

  selected(shopName: string) {
    this.selectedShop = shopName;
  }

  add(a: number, b: number) {
    return a+b;
  }
  substract(a: number, b: number) {
    return a-b;
  }
  multiply(a: number, b: number) {
    return a*b;
  }
  divide(a: number, b: number) {
    return a/b;
  }

  calculator(operation: string, n1: number, n2: number) {
    let result;
    switch(operation) {
      case 'add':
        result = this.add(n1, n2);
        break;
      case 'sub':
        result = this.substract(n1, n2);
        break;
      case 'mul':
        result = this.multiply(n1, n2);
        break;
      case 'div':
        result = this.divide(n1, n2);
        break
      default:
        result = this.add(n1, n2);
        break;
    };
    this.appService.saveResult({result: result}).subscribe((data) => {
      this.result = data;
    })
    return result;
  }

  showResult() {
    if (this.calculator('add', 10,10) >= 40) {
      return 'Pass';
    } else return 'Fail';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      alert(JSON.stringify(this.form.value));
    }
  }

  onSubmitTemplateForm(form: any) {
    if(form.form.valid) { alert(JSON.stringify(form.form.value))}
  }

}

