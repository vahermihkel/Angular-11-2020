import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  products = [
    { title: "Tere või 82%", category: "Piimatoode", price: 1.49, imgSrc: "https://ecoop.ee/media/cache/db/1f/95672-tere-voi-82-200g-01d1.png" },
    { title: "Tere või 82%", category: "Piimatoode", price: 1.49, imgSrc: "https://ecoop.ee/media/cache/db/1f/95672-tere-voi-82-200g-01d1.png" },
    { title: "Tere või 82%", category: "Piimatoode", price: 1.49, imgSrc: "https://ecoop.ee/media/cache/db/1f/95672-tere-voi-82-200g-01d1.png" },
    { title: "Tallegg broilerisisefilee Eestimaine 400g", category: "Lihatood", price: 2.19, imgSrc: "https://ecoop.ee/media/cache/64/a8/1090532-tallegg-broilerisisefilee-eestimaine-400g-f883.png" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
