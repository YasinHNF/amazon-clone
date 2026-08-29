import {formatCurrency} from '../scripts/utils/money.js';

console.log('Test suite: formatCurrency');

console.log("Convert cents into dollars");

if (formatCurrency(2095) === 20.95) {
    console.log('Passed');
} else {
    console.log('Failed');
};

console.log('Works with 0');

if (formatCurrency(0) === 0) {
    console.log('Passes');
} else {
    console.log("Failed");
};
