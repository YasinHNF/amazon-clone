export function formatCurrency(priceCents) {
    priceCents /= 100;
    return priceCents;
};

export function displayPrice(price) {
    return formatCurrency(price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
};
