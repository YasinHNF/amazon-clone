import { orders, loadOrders } from "../data/orders.js"; 
import { loadCart, calculateCartFullQuantity, addToCart } from "../data/cart.js";
import { displayPrice } from "./utils/money.js";
import { loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const ordersGrid = document.querySelector('.js-orders-grid');


function ordersEmpty() {
  document.querySelector('.main').innerHTML += `<p>You didn't order anything.</p><a href="../amazon.html"><button class="order-button">Order</button></a>`
};


loadCart();

function updateCartquantity() {
  document.querySelector('.js-cart-quantity').textContent = calculateCartFullQuantity();
};

updateCartquantity();

loadOrders();


const products = await loadProductsFetch();

let fullHtml = '';

function renderHtml() {
    let html = '';

    orders.forEach(orderItem => {
        const orderDate = dayjs(orderItem.orderTime);
        const formattedDate = orderDate.format('MMMM DD');

        const orderPrice = displayPrice(orderItem.totalCostCents);

        html += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${orderPrice}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>
          <div class="order-details-grid">`

          orderItem.products.forEach(orderProductItem  => {
            const productDetails = products.find(product => product.id === orderProductItem.productId);
            
            const estimatedDeliveryTime = dayjs(orderProductItem.estimatedDeliveryTime);
            const formattedDate = estimatedDeliveryTime.format('MMMM DD')

            html += `
                    <div class="product-image-container">
                    <img src="${productDetails.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${productDetails.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${formattedDate}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${orderProductItem.quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again" data-product-id="${orderProductItem.productId}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                      <a href="tracking.html?orderId=${orderItem.id}&productId=${orderProductItem.productId}">
                          <button class="track-package-button button-secondary">
                          Track package
                          </button>
                      </a>
                    </div>
                `;



          });

          html += '</div></div>'


    });




    fullHtml += html;
    ordersGrid.innerHTML = fullHtml;

    document.querySelectorAll('.js-buy-again').forEach((button) => {
      button.addEventListener('click', () => { 
        const { productId } = button.dataset;
        addToCart(productId);
        updateCartquantity();

        const buttonMainContent = button.innerHTML;

        button.textContent = 'Added !';
        button.classList.add('buy-again-button-disabled');

        setTimeout(
          () => {
            button.classList.remove('buy-again-button-disabled');
            button.innerHTML = buttonMainContent;
          },
          2000
        )
        
      })
    });
    

};

if (orders.length === 0) {
  ordersEmpty();
} else {
  renderHtml();
};
