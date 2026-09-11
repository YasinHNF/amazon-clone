import renderProductsSummary from './checkout/orderSummary.js';
import renderPriceSummary from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import '../data/backend-practice.js';
// import '../data/car.js';
// import '../data/cart-class.js';

loadProducts((products) => {
    renderProductsSummary(products);
    renderPriceSummary(products);
})