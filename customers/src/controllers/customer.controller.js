class CustomerController {
  constructor(service) {
    this.service = service
  }

  signUp = async (req, res, next) => {
    try {
      const {email, password, phone} = req.body;
      const data = await this.service.SignUp({email, password, phone});
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await this.service.SignIn({ email, password });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  addNewAddress = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { street, postalCode, city, country } = req.body;
        const data = await this.service.AddNewAddress(_id, { street, postalCode, city, country });
        return res.json(data);
    } catch (err) {
        next(err);
    }
  }

  getProfile = async (req, res, next) => {
      try {
          const { _id } = req.user;
          const data = await this.service.GetProfile(_id);
          return res.json(data);
      } catch (err) {
          next(err);
      }
  }

  getWishList = async (req, res, next) => {
      try {
          const { _id } = req.user;
          const data = await this.service.GetWishList(_id);
          return res.status(200).json(data);
      } catch (err) {
          next(err);
      }
  }

  addToWishlist = async (req, res, next) => {
      try {
          const { _id } = req.user;
          const { productId } = req.body;
          const data = await this.service.AddToWishlist(_id, productId);
          return res.status(200).json(data);
      } catch (err) {
          next(err);
      }
  }

  removeFromWishlist = async (req, res, next) => {
      try {
          const { _id } = req.user;
          const productId = req.params.id;
          const data = await this.service.RemoveFromWishlist(_id, productId);
          return res.status(200).json(data);
      } catch (err) {
          next(err);
      }
  }
}

module.exports = CustomerController;
