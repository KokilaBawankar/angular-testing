import { LazyTestComponent } from './components/lazy-test/lazy-test.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: '', component: LazyTestComponent}
];


@NgModule({
  declarations: [LazyTestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyTestModule { }
