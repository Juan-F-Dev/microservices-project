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

    addToWishlist = async (req, res, next) => {
        res.status(501).json({ message: "Pendiente: Lógica trasladada al API Gateway / Customer Service" });
    }

    removeFromWishlist = async (req, res, next) => {
        res.status(501).json({ message: "Pendiente: Lógica trasladada al API Gateway / Customer Service" });
    }

    addToCart = async (req, res, next) => {
        res.status(501).json({ message: "Pendiente: Lógica trasladada al API Gateway / Customer Service" });
    }

    removeFromCart = async (req, res, next) => {
        res.status(501).json({ message: "Pendiente: Lógica trasladada al API Gateway / Customer Service" });
    }
}

module.exports = ProductController;
