
global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ShoppingRepository = require('./src/repositories/shopping.repository');
const ShoppingService = require('./src/services/shopping.service');
const ShoppingController = require('./src/controllers/shopping.controller');
const UserAuth = require('./src/middlewares/auth');

const app = express();
const PORT = process.env.PORT || 8003;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/shopping';

app.use(express.json());
app.use(cors());

const repository = new ShoppingRepository();
const service = new ShoppingService(repository);
const controller = new ShoppingController(service);

app.get('/cart', UserAuth, controller.getCart);
app.post('/cart', UserAuth, controller.manageCart);
app.post('/order', UserAuth, controller.placeOrder);

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Shopping Database connected');
        app.listen(PORT, () => console.log(`Shopping service running on port ${PORT}`));
    })
    .catch(err => console.error(err));
