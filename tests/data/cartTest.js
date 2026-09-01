import { addToCart, cart, loadCart } from '../../data/cart.js';

const productId = 'id1';

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(
            () => {
                return JSON.stringify(
                    [
                        {
                            productId: productId,
                            quantity: 1,
                            deliveryOptionId: '1'
                        }
                    ]
                );
            }
        );

        spyOn(localStorage, 'setItem');


        loadCart();

        addToCart(productId, 1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart.length).toEqual(1);
        expect(cart[0]).toEqual(
            {
                productId: 'id1',
                quantity: 2,
                deliveryOptionId: '1'
            }
        );

    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        spyOn(localStorage, 'setItem');

        loadCart();

        addToCart(productId);

        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0]).toEqual({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });

    });
})