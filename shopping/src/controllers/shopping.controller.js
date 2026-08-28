class ShoppingController {
    constructor(service) {
        this.service = service;
    }

    placeOrder = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { txnId } = req.body;
            const { data } = await this.service.PlaceOrder(_id, txnId);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    }

    getCart = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { data } = await this.service.GetCart(_id);
            return res.json(data);
        } catch (err) { next(err); }
    }

    manageCart = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { product, qty, isRemove } = req.body; // 'product' contiene el ID y los datos básicos
            const { data } = await this.service.ManageCart(_id, product, qty, isRemove);
            return res.json(data);
        } catch (err) { next(err); }
    }
}

module.exports = ShoppingController;
