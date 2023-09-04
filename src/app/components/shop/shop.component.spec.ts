import { UpperCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let expectedShop = {name: 'Vrundavan Tiles', location: 'Morshi', turnOver: '$20 Billon', yearEst: '1999'};
  let uppercasePipe: UpperCasePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    component.shop = expectedShop;
    fixture.detectChanges();
    uppercasePipe = new UpperCasePipe();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input value', () => {
    expect(component.shop).toEqual(expectedShop);
  })

  it('shop name should display in upper - UpperCase Pipe', () => {
    let title: HTMLDivElement = fixture.nativeElement.querySelector('h5');
    expect(uppercasePipe.transform(expectedShop.name)).toBe(expectedShop.name.toUpperCase());
  })

  it('output event', () => {
    let selectedShopName: any;
    component.selected.pipe(first()).subscribe(data => selectedShopName = data);
    let button = fixture.debugElement.nativeElement.querySelector('a');
    button.dispatchEvent(new Event('click'));
    expect(selectedShopName).toEqual(expectedShop.name)
  })
});
