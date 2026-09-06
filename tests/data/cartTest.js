import * as cartFile from '../../data/cart.js';

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

        cartFile.loadCart();

        expect(localStorage.getItem).toHaveBeenCalledWith('cart');

        cartFile.addToCart(productId, 1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cartFile.cart));

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cartFile.cart.length).toEqual(1);
        expect(cartFile.cart[0]).toEqual(
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
        cartFile.loadCart();

        cartFile.addToCart(productId);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cartFile.cart));

        expect(cartFile.cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cartFile.cart[0]).toEqual({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });

    });
});


describe('test suit: removeFromCart', () => {
    it('removes an item from cart', () => {
        spyOn(localStorage, 'setItem');

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

        cartFile.loadCart();

        cartFile.deleteFromCart(productId);

        expect(cartFile.cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');




    });
});