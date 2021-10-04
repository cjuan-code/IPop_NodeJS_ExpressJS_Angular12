export class Category {
    slug: string;
    name: string;
    img: string;

    constructor ( slug: string, name: string, img: string) {
        this.slug = slug;
        this.name = name;
        this.img = img;
    }
}