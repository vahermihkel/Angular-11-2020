import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  products: any;

  constructor(private itemService: ItemService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.itemService.products;
  }

  onAddToCart(product: any) {
    console.log(product);
    this.cartService.productsInService.push(product);
    console.log(this.cartService.productsInService);
  }
}
