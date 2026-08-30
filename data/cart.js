export let cart;

loadCart();

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);

};

export function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
};

export function addToCart(productId, quantity = 1) {
  let productExists = false;

  cart.forEach(
    cartItem => {
      if (cartItem.productId === productId) {
        cartItem.quantity += quantity;
        productExists = true;
      };
    }
  );

  if (!productExists) {
    cart.push(
      {
        productId,
        quantity: quantity,
        deliveryOptionId: '1'
      }
    );
  };

  saveCart();
};

export function deleteFromCart(productId) {
  const filteredCart = cart.filter(
    cartItem => cartItem.productId !== productId
  );

  cart = filteredCart;
  saveCart();
};

export function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.productId === productId);
  product.quantity = newQuantity;
  saveCart();
};

export function calculateCartFullQuantity() {
  let quantity = 0;

  cart.forEach(
    cartItem => {
      quantity += cartItem.quantity;
    }
  );

  return quantity;
};

export function updateDeliveryId(productId, deliveryCode) {
  const cartItem = cart.find(
    product => product.productId === productId
  );

  cartItem.deliveryOptionId = deliveryCode;

  saveCart();

};