const CartModel = require('../models/Cart');
const OrderModel = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

class ShoppingRepository {
  async GetCart(customerId) {
    return await CartModel.findOne({ customerId });
  }

  async ManageCart(customerId, product, qty, isRemove) {
    let cart = await CartModel.findOne({ customerId });

    if (!cart) {
      cart = new CartModel({
        customerId,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product.toString()
    );

    if (isRemove) {
      if (itemIndex !== -1) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      if (itemIndex !== -1) {
        cart.items[itemIndex].unit = qty;
      } else {
        cart.items.push({
          product,
          unit: qty
        });
      }
    }

    return await cart.save();
  }

  async CreateNewOrder(customerId, amount, txnId, cartItems) {
    const orderId = uuidv4();

    const order = new OrderModel({
      orderId,
      customerId,
      amount,
      txnId,
      status: 'received',
      items: cartItems
    });

    return await order.save();
  }

  async ClearCart(customerId) {
    return await CartModel.findOneAndUpdate(
      { customerId },
      { items: [] },
      { new: true }
    );
  }
}

module.exports = ShoppingRepository;
