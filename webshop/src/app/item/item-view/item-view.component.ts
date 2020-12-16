import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  // products: any;
  product: any;
  id: any;

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.products = this.itemService.products;
    this.id = this.route.snapshot.paramMap.get("itemId");
    this.product = this.itemService.products[this.id];
  }

}
