import { Item } from '../item.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  products: Item[];

  constructor(private itemService: ItemService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    // this.products = this.itemService.getProducts();  
    // this.itemService.products = []; 
    this.itemService.fetchProductsFromDatabase().subscribe(response => { 
        this.products = response;
      });
  }

  onSortTitle() {
    this.products = this.products.sort((thisItem, nextItem) => 
      thisItem.title.localeCompare(nextItem.title)
    );
  }

  onSortPopularity() {

  }

  onSortPrice() {
    this.products = this.products.sort((thisItem, nextItem) => 
      (Number)(thisItem.price) - (Number)(nextItem.price)
    );
  }

  onSortDiscount() {

  }

  onAddToCart(product: any): void {
    this.cartService.productsInService.push(product);
    localStorage.setItem("items", 
        JSON.stringify(this.cartService.productsInService));
  }

  onMouseEnter(item: any): void {
    item.showButton = true;
  }

  onMouseLeave(item: any): void {
    item.showButton = false;
  }

  onAddToDatabase() {
    this.itemService.saveProductsToDatabase();
  }
}
