import { Item } from './../item/item.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInService: Item[] = [];

  constructor() { }
}
