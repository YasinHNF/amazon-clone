export let cart;

loadCart();

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));

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


export function loadCart2(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    callback();

  }
);


  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

};

export async function loadCart2Fetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const data = await response.text();
};

export function deleteCart(){
  localStorage.removeItem('cart');
};