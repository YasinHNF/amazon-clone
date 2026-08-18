import { products } from '../data/products.js'

const cart = JSON.parse(localStorage.getItem('cart'))

const productsContainerEl = document.querySelector('.js-order-summary');
const returnHomeLinkEl = document.querySelector('.js-return-home-link');

let fullPrice = 0;
let itemsQuantity = 0;


function loadProducts() {
    let productsHTML = ''

    cart.forEach(
        cartItem => {
            const { productId, quantity } = cartItem;

            itemsQuantity += quantity;

            let productImage;
            let productName;
            let productPrice;

            products.forEach(
                product => {
                    if (product.id === productId) {
                        productImage = product.image;
                        productName = product.name;
                        productPrice = (product.priceCents / 100).toFixed(2);
                        return;
                    };
                }
            );

            fullPrice += productPrice;

            const productHTML = `<div class="cart-item-container">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${productImage}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${productName}
                    </div>
                    <div class="product-price">
                    $${productPrice}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>`
            productsHTML += productHTML;

        }
    );

    productsContainerEl.innerHTML += productsHTML;
    returnHomeLinkEl.innerText = `${itemsQuantity} items`;
    
};

loadProducts();




