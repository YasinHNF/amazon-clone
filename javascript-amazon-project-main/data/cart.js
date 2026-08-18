export const cart = [];


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));

};


export function addToCart(productId, cartQuantityElement) {
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
        quantity: selectedQuantity
      }
    );
  };

  saveCart();


  let cartQuantity = 0;

  cart.forEach(
    item => cartQuantity += item.quantity
  );

  cartQuantityElement.innerText = cartQuantity;

};

