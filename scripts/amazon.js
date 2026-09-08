import { cart, addToCart } from '../data/cart.js';
import products from '../data/products.js';


let productsHTML = '';
const cartQuantityElement = document.querySelector('.js-cart-quantity');
updateCartQuantity();


function checkTimeOutIds(productId) {
  timeOutIds.forEach(
  (timeOutInfo, index) => {
    const { itemId, timeOutId } = timeOutInfo;
    if (itemId === productId) {
        clearTimeout(timeOutId);
        timeOutIds.splice(index, 1);
      };
    }
  );
};

function updateCartQuantity() {
  let quantity = 0;

  cart.forEach(
    cartItem => {
      quantity += cartItem.quantity;
    }
  );

  cartQuantityElement.textContent = quantity;
};

products.forEach(
    (product) => {
        const { id, image, name, rating } = product;

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
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
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
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const selectedQuantity = Number(quantitySelector.value);


        addToCart(productId, selectedQuantity);
        updateCartQuantity();

      }
    );
  }
);
