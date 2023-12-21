import { Test, TestingModule } from '@nestjs/testing';
import { StoreProductController } from './store-product.controller';
import { StoreProductService } from './store-product.service';

describe('StoreProductController', () => {
    let controller: StoreProductController;
    let mockStoreProductService;

    beforeEach(async () => {
        mockStoreProductService = {
            create: jest.fn().mockResolvedValue('create'),
            update: jest.fn().mockResolvedValue('update'),
            remove: jest.fn().mockResolvedValue('remove'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            findAll: jest.fn().mockResolvedValue('findAll'),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreProductController],
            providers: [{ provide: StoreProductService, useValue: mockStoreProductService }],
        }).compile();

        controller = module.get<StoreProductController>(StoreProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call create', async () => {
        const CreateStoreProductDto = { 
            id_store: 'store-id',
            id_product: 'product-id',
            stock: 10,
            image: 'image-url'
        };
        expect(await controller.create(CreateStoreProductDto)).toBe('create');
        expect(mockStoreProductService.create).toHaveBeenCalledWith(CreateStoreProductDto);
    });

    it('should call update', async () => {
        const updateStoreProductDto = { 
            id_store: 'store-id',
            id_product: 'product-id',
            stock: 10,
            image: 'image-url'
        };
        expect(await controller.update('123', updateStoreProductDto)).toBe('update');
        expect(mockStoreProductService.update).toHaveBeenCalledWith('123', updateStoreProductDto);
    });

    it('should call remove', async () => {
        expect(await controller.remove('123')).toBe('remove');
        expect(mockStoreProductService.remove).toHaveBeenCalledWith('123');
    });

    it('should call findOne', async () => {
        expect(await controller.findOne('123')).toBe('findOne');
        expect(mockStoreProductService.findOne).toHaveBeenCalledWith('123');
    });

    it('should call findAll', async () => {
        expect(await controller.findAll()).toBe('findAll');
        expect(mockStoreProductService.findAll).toHaveBeenCalled();
    });
});