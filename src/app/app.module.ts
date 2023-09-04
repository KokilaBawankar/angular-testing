import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './components/shop/shop.component';
import { PostComponent } from './components/post/post.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { HighlightDirective } from './directives/highlight.directive';
import { LettercasePipe } from './pipes/lettercase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    PostComponent,
    TodoListComponent,
    TodoComponent,
    HighlightDirective,
    LettercasePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  exports: [LettercasePipe, FormsModule]
})
export class AppModule { }
