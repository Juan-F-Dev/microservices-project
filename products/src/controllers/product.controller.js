class ProductController {
    constructor(service) {
        this.service = service;
    }

    getProducts = async (req, res, next) => {
        try {
            const { data } = await this.service.GetProducts();
            return res.json(data);
        } catch (err) {
            next(err);
        }
    }

    getProductById = async (req, res, next) => {
        try {
            const { data } = await this.service.GetProductById(req.params.id);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductController;
