import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item.model';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(value: Item[]): Item[] {
    // *ngFor="let product of products; let i = index"
    // vasakul on nagu ülemine, parem on nagu siin all
    // product == el
    // i == index
    // products == array
    let uniqueArray = value.filter((el, index, array) => {
      // map on massiivi muutmine -> pärast seda on massiiv kategooriatest
      // (enne oli toodetest)
      // {title: "Küpsis", price: 1.9, imgSrc: "wwwcom", category: "snack"},{title: "Või", price: 1.9, imgSrc: "wwwcom", category: "piimatooted"}
      // "snack", "snack", "snack", "snack", "piimatooted", "snack", "piimatooted" ....
      return (array.map(arrayEl=>arrayEl.category))
        .indexOf(el.category)==index;    
      });
      // kui ma küsin indexOf'ga INDEXit, siis ta annab alati kõige esimese indeksi
      // snack -> 0
      // piimatooted -> 4
    return uniqueArray;
  }

}
