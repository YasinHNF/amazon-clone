import { loadProductsFetch } from "../../data/products.js";
import { renderHTML } from "./amazon-main.js";

export async function renderSearchResult(searchText) {
    const productsArray = await loadProductsFetch();
    
    const searchResultProducts = productsArray.filter(
        product => product.name.toLowerCase().includes(searchText) || product.keywords.includes(searchText)
    );


    renderHTML(searchResultProducts);

};