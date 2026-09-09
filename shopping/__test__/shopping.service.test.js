const ShoppingService = require('../src/services/shopping.service');

describe('ShoppingService', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      GetCart: jest.fn(),
      ManageCart: jest.fn(),
      CreateNewOrder: jest.fn(),
      ClearCart: jest.fn(),
    };
    service = new ShoppingService(mockRepository);
  });

  it('debe retornar el carrito del cliente', async () => {
    const mockCart = { _id: 'cart_1', items: [{ product: 'prod_1', unit: 2 }] };
    mockRepository.GetCart.mockResolvedValue(mockCart);

    const result = await service.GetCart('cust_1');

    expect(mockRepository.GetCart).toHaveBeenCalledWith('cust_1');
    expect(result.data).toEqual(mockCart);
  });

  it('debe gestionar y actualizar el carrito correctamente', async () => {
    const mockUpdatedCart = { _id: 'cart_1', items: [{ product: 'prod_1', unit: 1 }] };
    mockRepository.ManageCart.mockResolvedValue(mockUpdatedCart);

    const result = await service.ManageCart('cust_1', 'prod_1', 1, false);

    expect(mockRepository.ManageCart).toHaveBeenCalledWith('cust_1', 'prod_1', 1, false);
    expect(result.data).toEqual(mockUpdatedCart);
  });
});
