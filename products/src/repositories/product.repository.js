const { NotFoundError } = require('../utils/app-errors');

class ProductRepository {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }

    async FindAll() {
        return this.ProductModel.find({});
    }

    async FindById(id) {
        const product = await this.ProductModel.findById(id);

        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return product;
    }
}

module.exports = ProductRepository;
