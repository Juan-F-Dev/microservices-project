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
app.use(express.json());
app.use(cors());

const repository = new CustomerRepository(CustomerModel, AddressModel);
const service = new CustomerService(repository);
const controller = new CustomerController(service);

app.post('/customer/signup', controller.signUp);
app.post('/customer/login', controller.signIn);
app.post('/customer/address', UserAuth, controller.addNewAddress);
app.get('/customer/profile', UserAuth, controller.getProfile);

mongoose.connect('mongodb://mongodb-dev:27017/car_sales_db')
    .then(() => {
        console.log('Database connected');
        app.listen(3001, () => console.log('Customer service running on port 3001'));
    })
    .catch(err => console.error(err));
