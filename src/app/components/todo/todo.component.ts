import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  id: string | null = '';
  todo: any;

  constructor(private activatedRoute: ActivatedRoute,
              private appService: AppService) { 
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.appService.getTodoById(this.id ? this.id : '0').subscribe(data => {
        this.todo = data;
      })
    })
  }

  ngOnInit(): void {
  }

}
