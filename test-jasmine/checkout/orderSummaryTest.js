import renderProductsSummary from '../../scripts/checkout/orderSummary.js';
import { loadCart, cart } from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'id1';
    const productId2 = 'id2';
    
    beforeEach(
        () => {
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify(
                    [
                        {
                            productId: productId1,
                            quantity: 1,
                            deliveryOptionId: '1'
                        },
                        {
                            productId: productId2,
                            quantity: 3,
                            deliveryOptionId: '2'
                        }
                    ]
                );
            });
            spyOn(localStorage, 'setItem');
            const productsContainerEl = document.querySelector('.js-test-container');
            productsContainerEl.innerHTML = `
            <div class="js-return-home-link"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            `;

            loadCart();
            renderProductsSummary();
            
        }
    );

    afterAll(() => {
        const productsContainerEl = document.querySelector('.js-test-container');
        productsContainerEl.innerHTML = '';
    });

    it('displays the cart', () => {

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        cart.forEach(cartItem => {
            const { productId, quantity } = cartItem;
            const quantityLabel = Number(document.querySelector(`.js-quantity-label-${productId}`).textContent);
            expect(quantityLabel).toEqual(quantity);

        });
    });


    it('removes an item from cart', () => {


        document.querySelector(`.js-delete-quantity-link[data-product-id="${productId1}"]`).click();


        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        expect(cart[0].quantity).toEqual(3);
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    });
});