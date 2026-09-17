import { formatCurrency } from "../scripts/utils/money.js";

export class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `${formatCurrency(this.priceCents).toFixed(2)}`;
  }

  extraInfoHTML() {
    return ''
  }

};

export class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;

  }
};

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink
  };

  extraInfoHTML() {
    return `
    <a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `
  }

};

/*
const date = new Date();

console.log(date.toLocaleTimeString())
*/

/*
const object2 = {
  a: 1,
  b: this.a
};
console.log(object2.method());
*/

/*
function logThis() {
  console.log(this);
};

logThis.call();


const dool = () => {
  console.log(this);
}
*/

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then(
    response => response.json()
  ).then(
    (responseData) => {
      const classifiedProducts = responseData.map(
        productDetails => {
          if (productDetails.type === 'clothing') {
            return new Clothing(productDetails);

          } else if (productDetails.type === 'appliance') {
            return new Appliance(productDetails);
          }

          return new Product(productDetails);
        }
      );

      return classifiedProducts;
    }
  ).catch((error) => {
    console.log('Error:', error);
  });

  return promise;
}

/*
loadProductsFetch().then(() => {
    console.log('next step')
  }
);
*/

export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    const products = JSON.parse(xhr.response);
    const classifiedProducts = products.map(
      productDetails => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);

        } else if (productDetails.type === 'appliance') {
          return new Appliance(productDetails);
        }

        return new Product(productDetails);
      }
      
    );
    callback(classifiedProducts);

  });

  xhr.addEventListener('error', () => {
    console.log('error. Please try again later');
  });


  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();

};


