export let cart = [];

loadCart();

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);

};

export function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
};


export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectedQuantity = Number(quantitySelector.value);

  let productExists = false;

  cart.forEach(
    cartItem => {
      if (cartItem.productId === productId) {
        cartItem.quantity += selectedQuantity;
        productExists = true;
      };
    }
  );

  if (!productExists) {
    cart.push(
      {
        productId,
        quantity: selectedQuantity,
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

