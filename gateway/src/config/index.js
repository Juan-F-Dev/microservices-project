const dotEnv = require('dotenv');
dotEnv.config();

module.exports = {
    PORT: process.env.PORT || 8000,
    CUSTOMER_URL: process.env.CUSTOMER_URL,
    PRODUCTS_URL: process.env.PRODUCTS_URL,
    SHOPPING_URL: process.env.SHOPPING_URL
};
