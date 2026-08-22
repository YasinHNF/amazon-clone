import { cart } from '../../data/cart.js';
import deliveryOptions from '../../data/deliveryOptions.js';
import products from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

function calculateItemsPrice() {
    let fullPrice = 0;

    cart.forEach(
        cartItem => {
            const { productId, quantity } = cartItem;
            const productItem = products.find(
                productItem => productItem.id === productId
            );
            
            const { priceCents } = productItem;
            fullPrice += priceCents * quantity;

            
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

export default renderPriceSummary;