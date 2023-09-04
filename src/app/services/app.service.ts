import { Injectable } from '@angular/core';
import { of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  baseUrl = 'https://jsonplaceholder.typicode.com';

  shops = [
    {
      name: 'Arc Vision Constructors',
      location: 'Dubai',
      turnOver: '$300 million',
      yearEst: '1998',
    },
    {
      name: 'JK Cement',
      location: 'India',
      turnOver: '$1000 million',
      yearEst: '2000',
    }
  ];

  constructor(private httpClient: HttpClient) { }

  getObject() {
    return this.shops;
  }

  getObservableObject() {
    return of(this.shops);
  }

  searchShop(name: string) {
    return this.shops.find(shop => shop.name.includes(name));
  }

  getPosts() {
    return this.httpClient.get(this.baseUrl + '/posts');
  }
  
  postPost(todo: any) {
    return this.httpClient.post(this.baseUrl + '/posts', todo);
  }

  getTodos() {
    return this.httpClient.get(this.baseUrl + '/todos');
  }

  getTodoById(id: string) {
    return this.httpClient.get(this.baseUrl + '/todos/' + id);
  }

  saveResult(result: {result: number}) {
    return this.httpClient.post(this.baseUrl + '/users', result);
  }
}
