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
const PORT = process.env.PORT || 3002;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/customers';

app.use(express.json());
app.use(cors());

const repository = new CustomerRepository(CustomerModel, AddressModel);
const service = new CustomerService(repository);
const controller = new CustomerController(service);

app.post('/customer/signup', controller.signUp);
app.post('/customer/login', controller.signIn);
app.post('/customer/address', UserAuth, controller.addNewAddress);
app.get('/customer/profile', UserAuth, controller.getProfile);


mongoose.connect(DB_URL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Customer service running on port ${PORT}`));
    })
    .catch(err => console.error(err));
