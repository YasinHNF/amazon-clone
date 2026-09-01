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

function displayPrice(price) {
    return formatCurrency(price).toFixed(2)
};

export function renderPriceSummary() {
    // const itemsPriceEl = document.querySelector('.js-items-price');
    // const shippingPriceEl = document.querySelector('.js-shipping-price');
    // const beforeTaxPriceEl = document.querySelector('.js-before-tax-price');
    // const taxPriceEl = document.querySelector('.js-tax-price');
    // const fullPriceEl = document.querySelector('.js-full-price');
    
    // Get the numbers
    const itemsPrice = Math.round(calculateItemsPrice());

    let shippingPrice = 0;

    cart.forEach(
        cartItem => {
            const { deliveryOptionId } = cartItem;
            const deliveryOption = deliveryOptions.find(deliveryOptionInfo => deliveryOptionInfo.id === deliveryOptionId);
            shippingPrice += Math.round(deliveryOption.priceCents);
        }
    );

    const beforeTaxPrice = Math.round(itemsPrice + shippingPrice);
    const taxPrice = Math.round(beforeTaxPrice * 0.10);
    const fullPrice = Math.round(beforeTaxPrice + taxPrice);

    const paymentSummaryEl = document.querySelector('.js-payment-summary');

    // render HTML 
    const html = `
      <div class="payment-summary-row">
        <div>Items (<span class="js-items-quantity-price-summary">0</span>):</div>
        <div class="payment-summary-money">$<span class="js-items-price">${displayPrice(itemsPrice)}</span></div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$<span class="js-shipping-price">${displayPrice(shippingPrice)}</span></div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$<span class="js-before-tax-price">${displayPrice(beforeTaxPrice)}</span></div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$<span class="js-tax-price">${displayPrice(taxPrice)}</span></div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$<span class="js-full-price">${displayPrice(fullPrice)}</span></div>
      </div>

      <button class="place-order-button button-primary js-place-order-button">
        Place your order
      </button>`;

    paymentSummaryEl.innerHTML = html;

};

export default renderPriceSummary;