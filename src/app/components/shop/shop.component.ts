import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input() shop: {name: string, location: string, turnOver: string, yearEst: string} = {name: '', location: '', turnOver: '', yearEst: ''};
  
  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickShop() {
    this.selected.emit(this.shop.name);
  }

}
