export class Item {
    name: string;
    desc: string;
    price: number;
    ubication: string;
    img: [string];
    viewed: number;
    liked: number;

    constructor( name: string, desc: string, price: number, ubication: string, img: [string], viewed: number, liked: number ) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.ubication = ubication;
        this.img = img;
        this.viewed = viewed;
        this.liked = liked;
    }
}