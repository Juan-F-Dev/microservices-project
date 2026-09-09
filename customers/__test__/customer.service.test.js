process.env.APP_SECRET = 'test_secret_key';
process.env.JWT_SECRET = 'test_secret_key';

const CustomerService = require('../src/services/customer.services');

global.fetch = jest.fn();

describe('CustomerService', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      CreateCustomer: jest.fn(),
      FindCustomer: jest.fn(),
      AddNewAddress: jest.fn(),
      GetProfile: jest.fn(),
      GetWishList: jest.fn(),
      AddToWishlist: jest.fn(),
      RemoveFromWishlist: jest.fn(),
    };
    service = new CustomerService(mockRepository);

    global.fetch.mockClear();
  });


  it('debe crear un usuario exitosamente (SignUp)', async () => {
    const mockInput = { email: 'test@test.com', password: '123', phone: '123456' };
    mockRepository.CreateCustomer.mockResolvedValue({ _id: '1', email: mockInput.email });

    const result = await service.SignUp(mockInput);

    expect(mockRepository.CreateCustomer).toHaveBeenCalled();
    expect(result.data).toHaveProperty('id');
  });

  it('debe lanzar error "Invalid credentials" al hacer SignIn si el usuario no existe', async () => {
    const mockInput = { email: 'noexiste@test.com', password: '123' };
    mockRepository.FindCustomer.mockResolvedValue(null);

    await expect(service.SignIn(mockInput)).rejects.toThrow('Invalid credentials');
    expect(mockRepository.FindCustomer).toHaveBeenCalledWith({ email: 'noexiste@test.com' });
  });

  it('debe obtener el perfil del usuario', async () => {
    const mockProfile = { _id: '1', email: 'test@test.com', phone: '123456' };
    mockRepository.GetProfile.mockResolvedValue(mockProfile);

    const result = await service.GetProfile('1');

    expect(mockRepository.GetProfile).toHaveBeenCalledWith('1');
    expect(result.data).toEqual(mockProfile);
  });

  it('debe agregar una nueva dirección al usuario', async () => {
    const mockAddress = { street: 'Calle 123', postalCode: '0000', city: 'Ciudad', country: 'País' };
    mockRepository.AddNewAddress.mockResolvedValue(mockAddress);

    const result = await service.AddNewAddress('1', mockAddress);

    expect(mockRepository.AddNewAddress).toHaveBeenCalledWith('1', mockAddress);
    expect(result.data).toEqual(mockAddress);
  });

  it('debe retornar un arreglo vacío si la wishlist no tiene items', async () => {
    mockRepository.GetWishList.mockResolvedValue([]);

    const result = await service.GetWishList('1');

    expect(result.data).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('debe consultar el microservicio de productos para llenar la wishlist', async () => {

    mockRepository.GetWishList.mockResolvedValue(['prod_1']);


    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ _id: 'prod_1', name: 'Zapatos', price: 100 })
    });

    const result = await service.GetWishList('1');

    expect(global.fetch).toHaveBeenCalledWith('http://host.docker.internal:8000/prod_1');
    expect(result.data).toEqual([{ _id: 'prod_1', name: 'Zapatos', price: 100 }]);
  });

  it('debe agregar un producto a la wishlist', async () => {
    mockRepository.AddToWishlist.mockResolvedValue(['prod_1', 'prod_2']);

    const result = await service.AddToWishlist('1', 'prod_2');

    expect(mockRepository.AddToWishlist).toHaveBeenCalledWith('1', 'prod_2');
    expect(result.data).toEqual(['prod_1', 'prod_2']);
  });

  it('debe remover un producto de la wishlist', async () => {
    mockRepository.RemoveFromWishlist.mockResolvedValue([]);

    const result = await service.RemoveFromWishlist('1', 'prod_1');

    expect(mockRepository.RemoveFromWishlist).toHaveBeenCalledWith('1', 'prod_1');
    expect(result.data).toEqual([]);
  });
});
