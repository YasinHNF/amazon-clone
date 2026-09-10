import {
    Product,
    Clothing,
    Appliance
} from '../../data/products.js';
import { formatCurrency } from '../../scripts/utils/money.js';


const productDetails = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
    stars: 5,
    count: 2197
    },
    priceCents: 1899,
    keywords: [
    "toaster",
    "kitchen",
    "appliances"
    ],
    type: 'appliance',
    instructionsLink: 'images/appliance-instructions.png',
    warrantyLink: 'images/appliance-warranty.png'
};



describe('test suit: Product class', () => {
    it('creates a new class and checkes if the the properties are correct', () => {
        const product = new Product(productDetails);
        expect(product.id).toEqual(productDetails.id);
        expect(product.image).toEqual(productDetails.image);
        expect(product.name).toEqual(productDetails.name);
        expect(product.priceCents).toEqual(productDetails.priceCents);
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
        expect(product.getPrice()).toEqual(formatCurrency(product.priceCents).toFixed(2));
        expect(product.extraInfoHTML()).toEqual('');
    });
});

describe('test suit: Clothing class', () => {
    it('checks the extraInfoHTML method and the type property', () => {
        const product = new Clothing(productDetails);
        expect(product.extraInfoHTML()).toContain(product.sizeChartLink);
    }) ;
});

describe('test suit: Appliance class', () => {
    it('checks the values and extraInfoHTML method', () => {
        const product = new Appliance(productDetails);
        expect(product.instructionsLink).toEqual(productDetails.instructionsLink);
        expect(product.warrantyLink).toEqual(productDetails.warrantyLink);
        expect(product.extraInfoHTML()).toContain(product.instructionsLink);
        expect(product.extraInfoHTML()).toContain(product.warrantyLink);
    });
});