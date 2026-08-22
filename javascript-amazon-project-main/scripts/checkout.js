import products from '../data/products.js'
import formatCurrency from './utils/money.js';
import { 
    cart, 
    saveCart, 
    deleteFromCart, 
    updateQuantity, 
    calculateCartFullQuantity,
    updateDeliveryId } from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import deliveryOptions from '../data/deliveryOptions.js';

const returnHomeLinkNumberEl = document.querySelector('.js-return-home-link');
const orderSummaryItemsQuantity = document.querySelector('.js-items-quantity-price-summary');

const productsContainerEl = document.querySelector('.js-order-summary');

function updateHTMLQuantities() {
    // Updates both returnHomeLinkNumberEl & orderSummaryItemsQuantity
    const itemsQuantity = calculateCartFullQuantity();
    returnHomeLinkNumberEl.textContent = `${itemsQuantity}`;
    orderSummaryItemsQuantity.textContent = `${itemsQuantity}`;
};

function deleteFromPage(productId, quantity) {
    const productElement = document.querySelector(`.js-cart-item-container-${productId}`);
    productElement.remove();
    // decreasing the items quantity

    renderPriceSummary();
    if (calculateCartFullQuantity() === 0) {
        emptyCartDialog();
    };
};

function emptyCartDialog() {
    const HTML = `
    <p>Your cart is empty.</p>
    <a href="./amazon.html"><button class="button-primary view-products-link" >View products</button></a>
    `
    productsContainerEl.innerHTML = HTML;
};

function renderProductsSummary() {
    let productsHTML = '';

    if (cart.length === 0) {
        emptyCartDialog();
        return;
    };
    
    // Rendring the HTML
    cart.forEach(
        cartItem => {
            const { productId, quantity } = cartItem;
            let productImage;
            let productName;
            let productPrice;
            products.forEach(
                product => {
                    if (product.id === productId) {
                        productImage = product.image;
                        productName = product.name;
                        productPrice = formatCurrency(product.priceCents).toFixed(2);
                        return;
                    };
                }
            );

            const deliveryItem = deliveryOptions.find(
                deliveryOption => cartItem.deliveryOptionId === deliveryOption.id
            );

            const timeNow = dayjs();
            const deliveryTime = timeNow.add(
                deliveryItem.deliveryDays,
                'day'
            );
            const deliveryTimeString = deliveryTime.format(
                'dddd, MMMM DD'
            );

            const productHTML = `<div class="cart-item-container js-cart-item-container-${productId}">
                        <div class="delivery-date">
                        Delivery date: <span class="js-delivery-date" data-product-id="${productId}">${deliveryTimeString}</span>
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
                                Quantity: <span class="quantity-label quantity-label js-quantity-label-${productId}">${quantity}</span>
                            </span>

                            <input type="number" class="quantity-input js-quantity-input js-quantity-input-${productId}" value="${quantity}" min="1"
                            data-product-id="${productId}">
                            <span class="save-quantity link-primary js-save-quantity js-save-quantity-${productId}"
                            data-product-id="${productId}">Save</span>

                            <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${productId}" 
                            data-product-id="${productId}">
                                Update
                            </span>

                            <span class="delete-quantity-link link-primary js-delete-quantity-link"
                            data-product-id="${productId}" data-product-quantity="${quantity}">
                                Delete
                            </span>
                            </div>
                        </div>
    
                        <div class="delivery-options">
                            <div class="delivery-options-title">
                            Choose a delivery option:
                            </div>

                            ${deliveryOptionsHTML(productId, cartItem)}
                            
                        </div>
                        </div>
            </div>`
            productsHTML += productHTML;
        }
    );

    updateHTMLQuantities();
    
    productsContainerEl.innerHTML += productsHTML;

    // Add event listener for delete links
    document.querySelectorAll('.js-delete-quantity-link').forEach(
        link => {
            link.addEventListener('click',
                () => {
                    const { productId, productQuantity } = link.dataset;
                    deleteFromCart(productId);
                    deleteFromPage(productId, productQuantity);
                    updateHTMLQuantities();
                }
            );
        }
    );

    // Add event listeners for update links
    document.querySelectorAll('.js-update-quantity-link').forEach(
        link => {
            const { productId } = link.dataset;

            link.addEventListener('click',
                () => {
                    link.classList.add('update-quantity-link-hide');

                    const quantityInputEl = document.querySelector(`.js-quantity-input-${productId}`);
                    const quantityLabelEl = document.querySelector(`.js-quantity-label-${productId}`);
                    const saveQuantityEl = document.querySelector(`.js-save-quantity-${productId}`);

                    quantityLabelEl.classList.add('quantity-label-hide');
                    quantityInputEl.classList.add('quantity-input-visible');
                    saveQuantityEl.classList.add('save-quantity-visible');

                }
            );
        }
    );

    // Add event listeners for save links
    document.querySelectorAll('.js-save-quantity').forEach(
        link => {
            link.addEventListener('click', 
                () => updateItemQuantity(link.dataset.productId)
            );
        }
    );

    // Add event listeners for quantity inputs
    document.querySelectorAll('.js-quantity-input').forEach(
        inputEl => {
            inputEl.addEventListener('keydown',
                event => {
                    if (event.key === 'Enter') 
                        updateItemQuantity(inputEl.dataset.productId);
                }
            );
        }
    );

    // Add event listeners for delviery time radio buttons 
    document.querySelectorAll('.js-delivery-option-input').forEach(
        deliveryOption => {
            const { productId, deliveryId } = deliveryOption.dataset;

            deliveryOption.addEventListener('click',
                () => {
                    updateDeliveryId(productId, deliveryId);
                    updateDeliveryDate(productId, deliveryId);
                    renderPriceSummary();

                }
            );
        }
    );
};

function deliveryOptionsHTML(productId, cartItem) {
    let html = '';

    deliveryOptions.forEach(
        deliveryOption => {
            const today = dayjs();

            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'day'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );


            const priceString = deliveryOption.priceCents === 0 
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

            html += `<div class="delivery-option">
                        <input type="radio" ${isChecked ? 'checked' : ''}
                            class="delivery-option-input js-delivery-option-input"
                            name="delivery-option-${productId}"
                            data-product-id="${productId}"
                            data-delivery-id="${deliveryOption.id}">
                        <div>
                            <div class="delivery-option-date">
                            ${dateString}
                            </div>
                            <div class="delivery-option-price">
                            ${priceString} Shipping
                            </div>
                        </div>
                        </div>`
            
        }
    );

    return html;
};

function updateDeliveryDate(productId, deliveryId) {
    const deliveryDateElement = document.querySelector(`.js-delivery-date[data-product-id="${productId}"]`);

    
    const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === deliveryId);

    const timeNow = dayjs();
    const deliveryDate = timeNow.add(
        deliveryOption.deliveryDays,
        'day'
    );

    const dateString = deliveryDate.format('dddd, MMMM DD');

    deliveryDateElement.innerText = dateString;

};

function updateItemQuantity(productId) {
    const quantityInputEl = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInputEl.value);  
    
    if (newQuantity > 999 || newQuantity < 1) {
        alert('Quantity cannot be higher than 999 or lower than 1');
        return;
    };
    
    const updaetLinkEl = document.querySelector(`.js-update-quantity-link-${productId}`);
    const quantityLabelEl = document.querySelector(`.js-quantity-label-${productId}`);
    const saveQuantityEl = document.querySelector(`.js-save-quantity-${productId}`);

    quantityLabelEl.textContent = quantityInputEl.value;

    updaetLinkEl.classList.remove('update-quantity-link-hide');
    quantityLabelEl.classList.remove('quantity-label-hide');
    quantityInputEl.classList.remove('quantity-input-visible');
    saveQuantityEl.classList.remove('save-quantity-visible');

    updateQuantity(productId, newQuantity);
    renderPriceSummary();
    updateHTMLQuantities();
    updateHTMLQuantities();         
};


function calculateItemsPrice() {
    let fullPrice = 0;

    cart.forEach(
        cartItem => {
            products.forEach(
                productItem => {
                    if (cartItem.productId === productItem.id) {
                        fullPrice += productItem.priceCents * cartItem.quantity;
                        return;
                    }
                }
            );
        }
    );
    return fullPrice;
};

function renderPriceSummary() {
    // Get the elements
    const itemsPriceEl = document.querySelector('.js-items-price');
    const shippingPriceEl = document.querySelector('.js-shipping-price');
    const beforeTaxPriceEl = document.querySelector('.js-before-tax-price');
    const taxPriceEl = document.querySelector('.js-tax-price');
    const fullPriceEl = document.querySelector('.js-full-price');
    
    // Get the numbers
    const itemsPrice = calculateItemsPrice();

    let shippingPrice = 0;

    cart.forEach(
        cartItem => {
            const { deliveryOptionId } = cartItem;
            const deliveryOption = deliveryOptions.find(deliveryOptionInfo => deliveryOptionInfo.id === deliveryOptionId);
            shippingPrice += deliveryOption.priceCents;
        }
    );

    const beforeTaxPrice = itemsPrice + shippingPrice;
    const taxPrice = beforeTaxPrice * 0.10;
    const fullPrice = beforeTaxPrice + taxPrice;

    // Put numbers in elements
    itemsPriceEl.textContent = formatCurrency(itemsPrice).toFixed(2);
    shippingPriceEl.textContent = formatCurrency(shippingPrice).toFixed(2);
    beforeTaxPriceEl.textContent = formatCurrency(beforeTaxPrice).toFixed(2);
    taxPriceEl.textContent = formatCurrency(taxPrice).toFixed(2);
    fullPriceEl.textContent = formatCurrency(fullPrice).toFixed(2);

};


renderProductsSummary();
renderPriceSummary();