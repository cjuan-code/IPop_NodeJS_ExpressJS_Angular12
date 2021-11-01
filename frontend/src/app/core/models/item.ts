export class Item {
    slug: string;
    name: string;
    desc: string;
    price: number;
    categ: [string];
    ubication: {
        ubication: string;
    };
    liked: number;
    isLiked: boolean;
    viewed: number;
    comment: [string];
    author: {
        username: string;
        bio: string;
        profileImg: string;
        following: boolean;
    };
    wear: string;
    state: string;
    shipping: boolean;
    img: [string];

    constructor( slug: string, name: string, desc: string, price: number, categ: [string], ubication: {ubication: string}, liked: number, isLiked: boolean, viewed: number, comment: [string], author: {username: string, bio: string, profileImg: string, following: boolean}, wear: string, state: string, shipping: boolean, img: [string] ) {
        this.slug = slug;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.categ = categ;
        this.ubication = ubication;
        this.liked = liked;
        this.isLiked = isLiked;
        this.viewed = viewed;
        this.comment = comment;
        this.author = author;
        this.wear = wear;
        this.state = state;
        this.shipping = shipping;
        this.img = img;

    }
}