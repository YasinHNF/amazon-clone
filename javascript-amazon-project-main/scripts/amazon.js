import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';



let productsHTML = '';
const cartQuantityElement = document.querySelector('.js-cart-quantity');


products.forEach(
    (product, index) => {
        const { id, image, name, rating, priceCents } = product;

        const html = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-cart-${id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${id}">
            Add to Cart
          </button>
        </div>
        
        `;
        
        productsHTML += html;
        
    }
);
document.querySelector('.js-products-grid').innerHTML += productsHTML;

const timeOutIds = [];

function checkTimeOutIds(productId) {
  timeOutIds.forEach(
  (timeOutInfo, index) => {
    const { itemId, timeOutId } = timeOutInfo;
    if (itemId === productId) {
        clearTimeout(timeOutId);
        timeOutIds.splice(index, 1);
        console.log(timeOutInfo);
      };
    }
  );
};

document.querySelectorAll('.js-add-to-cart').forEach(
  button => {
    button.addEventListener('click', () => {
        const { productId } = button.dataset;

        const addedCartTextEl = document.querySelector(`.js-added-cart-${productId}`);

        addedCartTextEl.classList.add('added-to-cart-visible');

        checkTimeOutIds(productId);

        const timeOutId = setTimeout(
          () => addedCartTextEl.classList.remove('added-to-cart-visible'),
          1200
        );

        timeOutIds.push(
          {
            itemId: productId,
            timeOutId
          }
        );

        addToCart(productId, cartQuantityElement);
        

        


      }
    );
  }
);
