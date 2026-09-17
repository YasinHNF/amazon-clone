import { renderHTML } from './amazon/amazon-main.js';
import { loadProductsFetch } from '../data/products.js';
import { renderSearchResult } from './amazon/amazon-search.js';

const searchItem = (new URL(window.location.href)).searchParams.get('search');
const products = await loadProductsFetch();

document.querySelector('.js-search-button').addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`;
});

if (searchItem) {
    renderSearchResult(searchItem);
} else {
    renderHTML(products);
};