import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  sumOfCart: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.cartItems = this.cartService.productsInService;
    this.cartItems = JSON.parse(localStorage.getItem("items"));
    this.calculateSumOfCart();
  }

  onDeleteItem(id: number) {
    this.cartItems = JSON.parse(localStorage.getItem("items"));
    this.cartItems.splice(id, 1);
    this.calculateSumOfCart();
    localStorage.setItem("items", 
        JSON.stringify(this.cartItems));
  }

  onEmptyCart() {
    // this.cartService.productsInService = [];
    this.cartItems = [];
    this.calculateSumOfCart();
    localStorage.setItem("items", 
      JSON.stringify(this.cartItems));
  }

  calculateSumOfCart() {
    this.sumOfCart = 0;
    this.cartItems.forEach((element: any) => {
      this.sumOfCart = this.sumOfCart + (Number)(element.price);
    });
    this.sumOfCart = (Number)(this.sumOfCart.toFixed(2));
  }
}
