import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: {
    title: string, 
    category: string, 
    price: string, 
    imgSrc: string }[];
  sumOfCart: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.cartItems = this.cartService.productsInService;
    this.cartItems = JSON.parse(localStorage.getItem("items"));
    this.sumOfCart = this.calculateSumOfCart();
  }

  onDeleteItem(id: number): void {
    this.cartItems = JSON.parse(localStorage.getItem("items"));
    this.cartItems.splice(id, 1);
    this.sumOfCart = this.calculateSumOfCart();
    localStorage.setItem("items", 
        JSON.stringify(this.cartItems));
  }

  onEmptyCart(): void {
    // this.cartService.productsInService = [];
    this.cartItems = [];
    this.sumOfCart = this.calculateSumOfCart();
    localStorage.setItem("items", 
      JSON.stringify(this.cartItems));
  }

  calculateSumOfCart(): number {
    let sum = 0;
    this.cartItems.forEach((element: any) => {
      sum = sum + (Number)(element.price);
    });
    sum = (Number)(sum.toFixed(2));
    return sum;
  }
}
