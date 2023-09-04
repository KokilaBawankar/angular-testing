import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';

const routes: Routes = [
    {path: 'lazy-test', loadChildren: () => import('./modules/lazy-test/lazy-test.module').then(m => m.LazyTestModule)},
    {path: 'todos', component: TodoListComponent},
    {path: 'todos/:id', component: TodoComponent},
    {path: '', redirectTo: 'todos', pathMatch: 'full'},
    {path: '**', component: AppComponent}
  ];

  export default routes;