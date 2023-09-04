import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: any[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getTodos().subscribe((todos: any) => {
      this.todos = todos.slice(0,5);
    });
  }

}
