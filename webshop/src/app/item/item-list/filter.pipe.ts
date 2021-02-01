import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Item[], categoriesList: {category: string, isSelected: boolean}[]): Item[] {
    
    let newArray: Item[] = [];
    products.forEach(product => {
      let category = categoriesList.find((categoriesListElement) =>  
        categoriesListElement.category == product.category  
      )
      if (category.isSelected == true) {
        newArray.push(product);
      }
    });
    return newArray;
  }

}
