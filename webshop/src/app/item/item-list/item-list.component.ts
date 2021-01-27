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
  productsOriginal: Item[];
  titleNumber = 0;
  dropdownOpen = false;

  constructor(private itemService: ItemService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    // this.products = this.itemService.getProducts();  
    // this.itemService.products = []; 
    this.itemService.fetchProductsFromDatabase().subscribe(response => { 
        this.products = response.slice();
        this.productsOriginal = response.slice();
    });
  }

  onSortTitle() {
    this.titleNumber = this.titleNumber + 1;
    if (this.titleNumber == 1) {
      this.products = this.products.sort((thisItem, nextItem) => 
      thisItem.title.localeCompare(nextItem.title));
    } else if (this.titleNumber == 2) {
      this.products = this.products.sort((thisItem, nextItem) => 
      nextItem.title.localeCompare(thisItem.title));
    } else if (this.titleNumber == 3) {
      this.products = this.productsOriginal.slice();
      this.titleNumber = 0;
    }

  }

  onSortPopularity() {

  }

  onSortPrice() {
    this.titleNumber = this.titleNumber + 1;
    if (this.titleNumber == 1) {
      // originaal mis oli enne sortPrice sees
      this.products = this.products.sort((thisItem, nextItem) => 
      (Number)(thisItem.price) - (Number)(nextItem.price));
    } else if (this.titleNumber == 2) {
      // vahetasin ära nextItem ja thisItem, muidu mis oli sortPrice sees
      this.products = this.products.sort((thisItem, nextItem) => 
      (Number)(nextItem.price) - (Number)(thisItem.price));
    } else if (this.titleNumber == 3) {
      // sama mis oli title sees
      this.products = this.productsOriginal.slice();
      this.titleNumber = 0;
    }
  }

  onSortDiscount() {

  }
  
  onOpenDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
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
