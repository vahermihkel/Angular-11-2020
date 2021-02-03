export class Item {
  constructor(
    public title: string,
    public category: string,
    public price: string,
    public imgSrc: string,
    public isFavourite: boolean,
    public popularity: number
    ) {}
}