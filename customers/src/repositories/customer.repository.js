const { APIError, BadRequestError } = require('../utils/app-errors');

class CustomerRepository {
  constructor(CustomerModel, AddressModel) {
    this.CustomerModel = CustomerModel;
    this.AddressModel = AddressModel;
  }

  async CreateCustomer({email, password, phone, salt}) {
    try {
      return await this.CustomerModel.create({email, password, salt, phone});
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestError('Email already registered');
      }
      throw new APIError('CreateCustomerError', 500, error.message);
    }
  }

  async FindCustomer({ email }) {
    return this.CustomerModel.findOne({email});
  }

  async AddNewAddress(customerId, { street, postalCode, city, country }) {
    const customer = await this.CustomerModel.findById(customerId);

    if (!customer) {
      throw new BadRequestError('Customer not found');
    }

    const address = await this.AddressModel.create({
      street,
      postalCode,
      city,
      country
    });
    customer.address.push(address._id);
    await customer.save();

    return address;
  }

  async GetProfile(customerId) {
    return this.CustomerModel.findById(customerId).populate('address');
  }

  async GetWishList(customerId) {
    const customer = await this.CustomerModel.findById(customerId);
    return customer.wishlist;
  }

  async AddToWishlist(customerId, productId) {
    const customer = await this.CustomerModel.findById(customerId);

    if (!customer.wishlist.includes(productId)) {
      customer.wishlist.push(productId);
      await customer.save();
    }

    return customer.wishlist;
  }

  async RemoveFromWishlist(customerId, productId) {
    const customer = await this.CustomerModel.findById(customerId);

    customer.wishlist = customer.wishlist.filter((id) => id !== productId);
    await customer.save();

    return customer.wishlist;
  }
}

module.exports = CustomerRepository;
