export function formatCurrency(priceCents) {
    priceCents /= 100;
    return priceCents.toFixed(2);
}