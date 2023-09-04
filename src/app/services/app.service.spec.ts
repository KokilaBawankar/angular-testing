import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let baseUrl = 'https://jsonplaceholder.typicode.com';

  let shops = [
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

  let posts = [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
      "userId": 1,
      "id": 4,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
      "userId": 1,
      "id": 5,
      "title": "nesciunt quas odio",
      "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(AppService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getObject method', () => {
    expect(service.getObject()).toEqual(shops);
  })

  it('getObservableObject method', () => {
    service.getObservableObject().subscribe((data: any) => {
      expect(data).toEqual(shops);
    });
  });

  it('searchShop method', () => {
    let shop = {
      name: 'JK Cement',
      location: 'India',
      turnOver: '$1000 million',
      yearEst: '2000',
    };
    expect(service.searchShop('JK Cement')).toEqual(shop);
  });

  it('Get Posts API call', () => {
    httpClient.get(baseUrl + '/posts').subscribe(data => {
      expect(data).toEqual(posts);
    })
    let req = httpTestingController.expectOne(baseUrl + '/posts');
    expect(req.request.method).toBe('GET');
    req.flush(posts);
  })

  it('Post Post API call', () => {
    let post = {
      "userId": 1,
      "id": 1,
      "title": "Title",
      "body": "body"
    };
    httpClient.post(baseUrl + '/posts', post).subscribe(data => {
      expect(data).toEqual(post);
    });
    let req = httpTestingController.expectOne(baseUrl + '/posts');
    expect(req.request.method).toBe('POST');
    req.flush(post);
  })
});
