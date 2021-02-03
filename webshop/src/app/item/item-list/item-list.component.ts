import { Item } from '../item.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { ItemService } from '../item.service';
import { UniquePipe } from './unique.pipe';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  productsShown: Item[];
  productsOriginal: Item[];
  productsCategories: {category: string, isSelected: boolean}[];
  titleNumber = 0;
  priceNumber = 0;
  popularityNumber = 0;
  dropdownOpen = false;
  isSorting = false;

  constructor(private itemService: ItemService, 
    private cartService: CartService,
    private uniquePipe: UniquePipe,
    private filterPipe: FilterPipe) { }

  ngOnInit(): void {
    // this.productsShown = this.itemService.getProducts();  
    this.itemService.fetchProductsFromDatabase().subscribe(response => { 
        this.productsShown = response.slice();
        this.productsOriginal = response.slice();
        // this.productsOriginal = response.map(item => ({...item, popularity: Math.floor(Math.random() * (10 - 1 + 1)) + 1}));
        this.productsCategories = this.uniquePipe.transform(this.productsShown).map(product=> { 
          return {category: product.category, isSelected: true}
        });
      });
  }

  onChangeCategory(i: number) {
    this.isSorting = true;
    this.productsCategories[i].isSelected = !this.productsCategories[i].isSelected;
    this.productsShown = this.filterPipe.transform(this.productsOriginal, this.productsCategories);
    this.isSorting = false;
  }

  onSortTitle() {
    this.titleNumber = this.titleNumber + 1;
    if (this.titleNumber == 1) {
      this.productsShown = this.productsShown.sort((thisItem, nextItem) => 
      thisItem.title.localeCompare(nextItem.title));
    } else if (this.titleNumber == 2) {
      this.productsShown = this.productsShown.sort((thisItem, nextItem) => 
      nextItem.title.localeCompare(thisItem.title));
    } else if (this.titleNumber == 3) {
      this.productsShown = this.filterPipe.transform(this.productsOriginal, this.productsCategories).slice();
      this.titleNumber = 0;
    }
  }

  onSortPopularity() {
    this.popularityNumber = this.popularityNumber + 1;
    if (this.popularityNumber == 1) {
      this.productsShown = this.productsShown.sort((thisItem, nextItem) => 
      thisItem.popularity - nextItem.popularity);
    } else if (this.popularityNumber == 2) {
      this.productsShown = this.productsShown.sort((thisItem, nextItem) => 
      nextItem.popularity - thisItem.popularity);
    } else if (this.popularityNumber == 3) {
      console.log(this.productsOriginal);
      this.productsShown = this.filterPipe.transform(this.productsOriginal, this.productsCategories).slice();
      this.popularityNumber = 0;
    }
  }

  onSortPrice() {
    this.priceNumber = this.priceNumber + 1;
    if (this.priceNumber == 1) {
      // originaal mis oli enne sortPrice sees
      this.productsShown = this.productsShown.sort((thisItem, nextItem) => 
      (Number)(thisItem.price) - (Number)(nextItem.price));
    } else if (this.priceNumber == 2) {
      // vahetasin ära nextItem ja thisItem, muidu mis oli sortPrice sees
      this.productsShown = this.productsShown.sort((thisItem, nextItem) => 
      (Number)(nextItem.price) - (Number)(thisItem.price));
    } else if (this.priceNumber == 3) {
      // sama mis oli title sees
      this.productsShown = this.filterPipe.transform(this.productsOriginal, this.productsCategories).slice();
      this.priceNumber = 0;
    }
    this.isSorting = false;
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

  onFavourite(item: Item) {
    item.isFavourite = !item.isFavourite;
  }
  
  ngOnDestroy(): void {
    this.itemService.saveProductsToDatabase(this.productsOriginal);
  }
}
