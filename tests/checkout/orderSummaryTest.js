import renderProductsSummary from '../../scripts/checkout/orderSummary.js';
import { loadCart, cart } from '../../data/cart.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';

let products;


describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = 'aad29d11-ea98-41ee-9285-b916638cac4a';

    beforeEach(
        async() => {
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

            const productsArray = await loadProductsFetch();
            products = productsArray;
            renderProductsSummary(productsArray);
            
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

        document.querySelectorAll('.js-product-name').forEach(
            nameEl => {
                const showingName = nameEl.textContent;
                const { productId } = nameEl.dataset;
                const productName = products.find(
                    product => productId === product.id
                ).name;
                expect(showingName.trim()).toEqual(productName);
            }
        );

        document.querySelectorAll(`.js-product-price`).forEach(
            productEl => {
                const showingPriceCents = Number(productEl.textContent) * 100;
                const { productId } = productEl.dataset;
                const productPriceCents = products.find(
                    product => {
                        const { id } = product;
                        if (id === productId) {
                            return true;
                        };
                    }
                ).priceCents;

                expect(showingPriceCents).toEqual(productPriceCents);
            }
        );
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