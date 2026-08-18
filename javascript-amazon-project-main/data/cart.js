export const cart = [];


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
        quantity: selectedQuantity
      }
    );
  };

  let cartQuantity = 0;

  cart.forEach(
    item => cartQuantity += item.quantity
  );

  cartQuantityElement.innerText = cartQuantity;

};