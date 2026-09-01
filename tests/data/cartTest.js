import { addToCart, cart, loadCart } from '../../data/cart.js';

const productId = 'id1';

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem')
    });

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

        loadCart();

        expect(localStorage.getItem).toHaveBeenCalledWith('cart');

        addToCart(productId, 1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

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
        loadCart();

        addToCart(productId);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0]).toEqual({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });

    });
})