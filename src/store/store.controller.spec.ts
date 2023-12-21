import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

describe('StoreController', () => {
    let controller: StoreController;
    let mockStoreService;

    beforeEach(async () => {
        mockStoreService = {
            create: jest.fn().mockResolvedValue('create'),
            update: jest.fn().mockResolvedValue('update'),
            remove: jest.fn().mockResolvedValue('remove'),
            findOne: jest.fn().mockResolvedValue('findOne'),
            findAll: jest.fn().mockResolvedValue('findAll'),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [{ provide: StoreService, useValue: mockStoreService }],
        }).compile();

        controller = module.get<StoreController>(StoreController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call create', async () => {
        const createDto = { name: 'Store', address: '123 Main St' };
        expect(await controller.create(createDto)).toBe('create');
        expect(mockStoreService.create).toHaveBeenCalledWith(createDto);
    });

    it('should call update', async () => {
        const updateDto = { name: 'Store', address: '123 Main St' };
        expect(await controller.update('123', updateDto)).toBe('update');
        expect(mockStoreService.update).toHaveBeenCalledWith('123', updateDto);
    });

    it('should call remove', async () => {
        expect(await controller.remove('123')).toBe('remove');
        expect(mockStoreService.remove).toHaveBeenCalledWith('123');
    });

    it('should call findOne', async () => {
        expect(await controller.findOne('123')).toBe('findOne');
        expect(mockStoreService.findOne).toHaveBeenCalledWith('123');
    });

    it('should call findAll', async () => {
        expect(await controller.findAll()).toBe('findAll');
        expect(mockStoreService.findAll).toHaveBeenCalled();
    });
});