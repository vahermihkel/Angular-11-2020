import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInService: {
    title: string, 
    category: string, 
    price: string, 
    imgSrc: string}[] = [];

  constructor() { }
}
