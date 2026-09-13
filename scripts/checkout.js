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

Promise.all([
    loadProductsFetch().then(
        (products) => {
            return new Promise(
                (resolve) => {
                    resolve(products);
                }
            );
        }
    ),

    new Promise((resolve) => {
        loadCart2(
            () => resolve()
        );
    })]

).then(
    (values) => {
        renderPriceSummary(values[0]);
        renderProductsSummary(values[0]);
    }
);


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