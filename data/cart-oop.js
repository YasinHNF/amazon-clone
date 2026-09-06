function CreateCart(localStorageName) {
    return {
        cartItems: undefined,

        loadCart() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageName)) || [];
        },

        saveCart() {
            localStorage.setItem(localStorageName, JSON.stringify(this.cartItems));
        },

        addToCart(productId, quantity = 1) {
            let productExists = false;

            this.cartItems.forEach(
                cartItem => {
                if (cartItem.productId === productId) {
                    cartItem.quantity += quantity;
                    productExists = true;
                };
                }
            );

            if (!productExists) {
                this.cartItems.push(
                {
                    productId,
                    quantity: quantity,
                    deliveryOptionId: '1'
                }
                );
            };

            this.saveCart();
        },

        deleteFromCart(productId) {
            const filteredCart = this.cartItems.filter(
                cartItem => cartItem.productId !== productId
            );

            this.cartItems = filteredCart;
            saveCart();
        },


        updateQuantity(productId, newQuantity) {
            const product = this.cartItems.find(item => item.productId === productId);
            product.quantity = newQuantity;
            this.saveCart();
        },

        calculateCartFullQuantity() {
            let quantity = 0;

            this.cartItems.forEach(
              cartItem => {
                quantity += cartItem.quantity;
              }
            );
        
            return quantity;
        },

        updateDeliveryId(productId, deliveryCode) {
            const cartItem = cart.find(
                product => product.productId === productId
            );

            cartItem.deliveryOptionId = deliveryCode;

            this.saveCart();

        }

    };
};


const cart = CreateCart('cart-oop');
const businessCart = CreateCart('cart-business');

cart.loadCart();
businessCart.loadCart();



cart.addToCart('id1');
cart.addToCart('id2');
businessCart.addToCart('id1', 20);
console.log(cart);
console.log(businessCart);

console.log(cart.cartItems);

