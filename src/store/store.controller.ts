import { Controller, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoreService } from './store.service';
import { StoreMSG } from  '../utils/constants';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @MessagePattern(StoreMSG.CREATE_STORE)
    async create(@Body() createStoreDto: CreateStoreDto) {
        return await this.storeService.create(createStoreDto);
    }

    @MessagePattern(StoreMSG.UPDATE_STORE)
    async update(@Payload('_id') _id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return await this.storeService.update(_id, updateStoreDto);
    }

    @MessagePattern(StoreMSG.DELETE_STORE)
    async remove(@Payload('_id') _id: string) {
        return await this.storeService.remove(_id);
    }

    @MessagePattern(StoreMSG.FIND_STORE)
    async findOne(@Payload('_id') _id: string) {
        return await this.storeService.findOne(_id);
    }

    @MessagePattern(StoreMSG.FIND_ALL_STORES)
    async findAll() {
        return await this.storeService.findAll();
    }
}