const { FormateData } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors');

class ShoppingService {
  constructor(repository) {
    this.repository = repository;
  }

  async PlaceOrder(customerId, txnId) {
    try {
      const cart = await this.repository.GetCart(customerId);

      if (!cart || cart.items.length === 0) {
        throw new BadRequestError('El carrito está vacío');
      }

      let amount = 0;

      for (const item of cart.items) {
        const productUrl = `http://product-service:8002/${item.product}`;

        console.log('Consultando producto:', productUrl);

        const response = await fetch(productUrl);

        console.log('Respuesta Products:', response.status);

        if (!response.ok) {
          throw new Error(
            `No se pudo obtener el precio del producto: ${item.product}`
          );
        }

        const productData = await response.json();

        const price = productData.price || 0;

        amount += price * item.unit;
      }

      const orderResult = await this.repository.CreateNewOrder(
        customerId,
        amount,
        txnId,
        cart.items
      );

      await this.repository.ClearCart(customerId);

      return FormateData(orderResult);
    } catch (err) {
      if (err instanceof APIError) throw err;
      throw new APIError('PlaceOrderError', 500, err.message);
    }
  }

  async GetCart(customerId) {
    try {
      const cart = await this.repository.GetCart(customerId);
      return FormateData(cart);
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }

  async ManageCart(customerId, product, qty, isRemove) {
    try {
      const cartResult = await this.repository.ManageCart(
        customerId,
        product,
        qty,
        isRemove
      );

      return FormateData(cartResult);
    } catch (err) {
      console.error('ERROR REAL EN MANAGE CART:', err);
      throw new APIError('Data Not found', 500, err.message);
    }
  }
}

module.exports = ShoppingService;
