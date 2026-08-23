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
}

module.exports = ShoppingController;
