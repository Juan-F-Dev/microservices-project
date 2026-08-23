const mongoose = require('mongoose');
const { FormateData } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors');

class ShoppingService {
    constructor(repository) {
        this.repository = repository;
    }

    async PlaceOrder(customerId, txnId) {
        try {
            /*
              const { data: cart } = await GET_CART_VIA_HTTP(customerId);

              if (!cart || cart.length === 0) {
                  throw new BadRequestError('Cart is empty');
              }

              const amount = cart.reduce((total, item) => total + item.product.price * item.unit, 0);

              const order = {
                  _id: new mongoose.Types.ObjectId().toString(),
                  amount,
                  txnId,
                  status: 'received',
                  items: cart,
                  date: new Date(),
              };

              const { data } = await PLACE_ORDER_VIA_HTTP(customerId, order);
              return FormateData(data);
            */

            throw new APIError('NotImplemented', 501, 'Pendiente: Comunicación con Customer Service vía API Gateway');

        } catch (err) {
            if (err instanceof APIError) throw err;
            throw new APIError('PlaceOrderError', 500, err.message);
        }
    }
}

module.exports = ShoppingService;
