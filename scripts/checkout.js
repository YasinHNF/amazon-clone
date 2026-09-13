import renderProductsSummary from './checkout/orderSummary.js';
import renderPriceSummary from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart2 } from '../data/cart.js';

// import '../data/backend-practice.js';
// import '../data/car.js';
// import '../data/cart-class.js';


/*
new Promise(
    (resolve)  => {
        loadProducts(
            (products) => {console.log(products);
                resolve();
            }
        );
    }
).then(
    () => {
    }
);
*/


async function loadPage()  {
    let products;
    try {
        products = await loadProductsFetch();        
    }
    catch (error) {
        console.log(error);
    };

    await new Promise((resolve, reject) => {
        loadCart2(() => {
            reject();
            resolve();
        });
    }).catch((error) => {
        console.log('Error!');
    });

    renderProductsSummary(products);
    renderPriceSummary(products);
};

loadPage();


// const values = await Promise.all([
//     loadProductsFetch(),

//     new Promise((resolve) => {
//         loadCart2(
//             () => resolve()
//         );
//     })]

// );

// const products = values[0];

// renderPriceSummary(products);
// renderProductsSummary(products);

// new Promise((resolve) => {
//     loadProducts(
//         products => resolve(products)
//     );


// }).then(
//     (products) => {

//         return new Promise((resolve) => {
//             loadCart2(
//                 () => resolve(products)
//             );
//         }
//         );
//     }


// ).then(
//     (products) => {
//         renderProductsSummary(products);
//         renderPriceSummary(products);
//     }
// );


/*
loadProducts((products) => {

    loadCart2(
        () => {
            console.log('load products')
            renderProductsSummary(products);
            renderPriceSummary(products);
        }
    );
})
*/


// new Promise((resolve) => {
//     loadProducts(
//         resolve()
//     );
// });