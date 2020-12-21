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
    this.cartItems = this.cartService.productsInService;
    this.sumOfCart = 0;
    this.cartItems.forEach((element: any) => {
      console.log(element.price);
      this.sumOfCart = this.sumOfCart + (Number)(element.price);
    });
  }

  onDeleteItem(id: number) {
    console.log(id);
    this.cartService.productsInService.splice(id, 1);
  }

}
