global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ProductModel = require('./src/models/Product');
const ProductRepository = require('./src/repositories/product.repository');
const ProductService = require('./src/services/product.service');
const ProductController = require('./src/controllers/product.controller');

const app = express();
const PORT = process.env.PORT || 8002;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/products';

app.use(express.json());
app.use(cors());

// Inyección de dependencias
const repository = new ProductRepository(ProductModel);
const service = new ProductService(repository);
const controller = new ProductController(service);

// Rutas
app.get('/', controller.getProducts);
app.get('/:id', controller.getProductById);

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Products service running on port ${PORT}`));
    })
    .catch(err => console.error(err));
