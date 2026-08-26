const proxy = require('express-http-proxy');
const { CUSTOMER_URL, PRODUCTS_URL, SHOPPING_URL } = require('./config');

module.exports = (app) => {
    app.use('/customer', proxy(CUSTOMER_URL));
    app.use('/shopping', proxy(SHOPPING_URL));
    app.use('/', proxy(PRODUCTS_URL));
};
