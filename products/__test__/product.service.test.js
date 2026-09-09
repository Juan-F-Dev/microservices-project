const ProductService = require('../src/services/product.service');

describe('ProductService', () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      FindAll: jest.fn(),
      FindById: jest.fn(),
    };
    service = new ProductService(mockRepository);
  });

  it('debe retornar la lista de productos y categorías', async () => {
    const mockProducts = [
      { _id: '1', type: 'sedan', name: 'Carro A' },
      { _id: '2', type: 'suv', name: 'Carro B' }
    ];
    mockRepository.FindAll.mockResolvedValue(mockProducts);

    const result = await service.GetProducts();

    expect(mockRepository.FindAll).toHaveBeenCalled();
    expect(result.data).toHaveProperty('products');
    expect(result.data).toHaveProperty('categories');
    expect(result.data.categories).toEqual(['sedan', 'suv']);
  });

  it('debe retornar un producto específico por su ID', async () => {
    const mockProduct = { _id: 'prod_1', name: 'Sedan Clásico' };
    mockRepository.FindById.mockResolvedValue(mockProduct);

    // Corregido: Llamamos al método real GetProductById
    const result = await service.GetProductById('prod_1');

    expect(mockRepository.FindById).toHaveBeenCalledWith('prod_1');
    expect(result.data).toEqual(mockProduct);
  });
});
