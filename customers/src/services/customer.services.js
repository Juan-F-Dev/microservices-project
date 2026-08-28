const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors');

class CustomerService {
    constructor(repository) {
        this.repository = repository;
    }

    async SignIn(userInputs) {
        const { email, password } = userInputs;
        try {
            const existingCustomer = await this.repository.FindCustomer({ email });
            if (existingCustomer) {
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                if (validPassword) {
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
                    return FormateData({ id: existingCustomer._id, token });
                }
            }
            throw new BadRequestError('Invalid credentials');
        } catch (err) {
            if (err instanceof APIError) throw err;
            throw new APIError('SignInError', 500, err.message);
        }
    }

    async SignUp(userInputs) {
        const { email, password, phone } = userInputs;
        try {
            const salt = await GenerateSalt();
            const hashedPassword = await GeneratePassword(password, salt);
            const existingCustomer = await this.repository.CreateCustomer({ email, password: hashedPassword, phone, salt });

            const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
            return FormateData({ id: existingCustomer._id, token });
        } catch (err) {
            if (err instanceof APIError) throw err;
            throw new APIError('SignUpError', 500, err.message);
        }
    }

    async AddNewAddress(_id, { street, postalCode, city, country }) {
        try {
            const address = await this.repository.AddNewAddress(_id, { street, postalCode, city, country });
            return FormateData(address);
        } catch (err) {
            throw new APIError('Data Not Found', 404, err.message);
        }
    }

    async GetProfile(_id) {
        try {
            const profile = await this.repository.GetProfile(_id);
            return FormateData(profile);
        } catch (err) {
            throw new APIError('Data Not Found', 404, err.message);
        }
    }

    async GetWishList(_id) {
        try {
            const wishlistIds = await this.repository.GetWishList(_id);

            if (!wishlistIds || wishlistIds.length === 0) {
                return FormateData([]);
            }

            const fullWishlist = [];

            // Iteramos sobre los IDs para pedirle los datos completos al microservicio de productos
            for (const productId of wishlistIds) {
                try {
                    const response = await fetch(`http://host.docker.internal:8000/${productId}`);
                    if (response.ok) {
                        const productData = await response.json();
                        fullWishlist.push(productData);
                    }
                } catch (fetchErr) {
                    console.error(`Error de red al buscar el producto ${productId}:`, fetchErr.message);
                }
            }

            return FormateData(fullWishlist);
        } catch (err) {
            throw new APIError('Data Not Found', 404, err.message);
        }
    }

    async AddToWishlist(_id, productId) {
        try {
            const wishlistIds = await this.repository.AddToWishlist(_id, productId);
            return FormateData(wishlistIds);
        } catch (err) {
            throw new APIError('Data Not Found', 404, err.message);
        }
    }

    async RemoveFromWishlist(_id, productId) {
        try {
            const wishlistIds = await this.repository.RemoveFromWishlist(_id, productId);
            return FormateData(wishlistIds);
        } catch (err) {
            throw new APIError('Data Not Found', 404, err.message);
        }
    }
}

module.exports = CustomerService;
