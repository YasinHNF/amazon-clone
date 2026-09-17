import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function renderPageNotFound() {
    document.querySelector('.main').innerHTML += '<p>This page does not exist.</p>'
};


const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const order = orders.find(orderItem => orderItem.id === orderId);

if (!order) {
    renderPageNotFound();
};

const product = order.products.find(productDetails => productId === productDetails.productId);

if (!product) {
    renderPageNotFound();
};


const products = await loadProductsFetch();


const productDetails = products.find(productItem => productItem.id === productId);

const deliveryTime = dayjs(product.estimatedDeliveryTime);

const quantity = product.quantity;

const orderContainer = document.querySelector('.main');


const deliveryDateFormatted = deliveryTime.format('MMMM DD');

const timeNowUnix = dayjs().unix();
const orderTimeUnix = dayjs(order.orderTime).unix();
const deliveryTimeUnix = deliveryTime.unix();

const percentProgress = ((timeNowUnix - orderTimeUnix) / (deliveryTimeUnix - orderTimeUnix)) * 100;

orderContainer.innerHTML = `
<div class="order-tracking">
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>
  <div class="delivery-date">
    Arriving on <span class="js-delivery-date">${deliveryDateFormatted}</span>
  </div>
  <div class="product-info js-product-name">
    ${productDetails.name}
  </div>
  <div class="product-info">
    Quantity: <span class="js-product-quantity">${quantity}</span>
  </div>
  <img class="product-image" src="${productDetails.image}">
  <div class="progress-labels-container">
    <div class="progress-label ${percentProgress < 49 ? 'current-status' : ''}">
      Preparing
    </div>
    <div class="progress-label ${percentProgress > 49 && percentProgress < 99 ? 'current-status' : ''}">
      Shipped
    </div>
    <div class="progress-label" ${percentProgress === 100 ? 'current-status' : ''}>
      Delivered
    </div>
  </div>
  <div class="progress-bar-container">
    <div class="progress-bar" style="width: ${percentProgress}%;"></div>
  </div>
</div>
`

