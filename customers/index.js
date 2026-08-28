global.crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const CustomerModel = require('./src/models/Customer');
const AddressModel = require('./src/models/Address');
const CustomerRepository = require('./src/repositories/customer.repository');
const CustomerService = require('./src/services/customer.services');
const CustomerController = require('./src/controllers/customer.controller');
const UserAuth = require('./src/middlewares/auth');

const app = express();
const PORT = process.env.PORT || 8001;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/customers';

app.use(express.json());
app.use(cors());

const repository = new CustomerRepository(CustomerModel, AddressModel);
const service = new CustomerService(repository);
const controller = new CustomerController(service);

app.post('/signup', controller.signUp);
app.post('/login', controller.signIn);
app.post('/address', UserAuth, controller.addNewAddress);
app.get('/profile', UserAuth, controller.getProfile);
app.get('/wishlist', UserAuth, controller.getWishList);
app.post('/wishlist', UserAuth, controller.addToWishlist);
app.delete('/wishlist/:id', UserAuth, controller.removeFromWishlist);

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Customer service running on port ${PORT}`));
    })
    .catch(err => console.error(err));
