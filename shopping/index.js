const express = require('express');
const cors = require('cors');

const ShoppingRepository = require('./src/repositories/shopping.repository');
const ShoppingService = require('./src/services/shopping.service');
const ShoppingController = require('./src/controllers/shopping.controller');
const UserAuth = require('./src/middlewares/auth');

const app = express();
const PORT = process.env.PORT || 3002;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/shopping';

app.use(express.json());
app.use(cors());

const repository = new ShoppingRepository();
const service = new ShoppingService(repository);
const controller = new ShoppingController(service);

app.post('/shopping/order/', UserAuth, controller.placeOrder);

app.listen(PORT, () => console.log(`Shopping service running on port 3003 ${PORT}`));
