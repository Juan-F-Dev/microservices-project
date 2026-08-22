global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ProductModel = require('./src/models/Product');
const ProductRepository = require('./src/repositories/product.repository');
const ProductService = require('./src/services/product.service');
const ProductController = require('./src/controllers/product.controller');
const UserAuth = require('./src/middlewares/auth');

const app = express();
app.use(express.json());
app.use(cors());

// Inyección de dependencias
const repository = new ProductRepository(ProductModel);
const service = new ProductService(repository);
const controller = new ProductController(service);

// Rutas
app.get('/', controller.getProducts);
app.get('/:id', controller.getProductById);
app.put('/wishlist', UserAuth, controller.addToWishlist);
app.delete('/wishlist/:id', UserAuth, controller.removeFromWishlist);
app.put('/cart', UserAuth, controller.addToCart);
app.delete('/cart/:id', UserAuth, controller.removeFromCart);

// Conexión a DB y levantamiento del server
mongoose.connect('mongodb://mongodb-dev:27017/car_sales_db')
    .then(() => {
        console.log('Database connected');
        app.listen(3002, () => console.log('Products service running on port 3002'));
    })
    .catch(err => console.error(err));
