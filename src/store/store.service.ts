import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './schema/store.schema';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    ) {}

    async create(store: CreateStoreDto): Promise<Store> {
        const newStore = await this.storeModel.create(store);
        return newStore;
    }

    async update(_id: string, store: UpdateStoreDto): Promise<Store> {
        const updatedStore = await this.storeModel.findByIdAndUpdate(
            _id,
            store,
            { new: true },
        );
        return updatedStore;
    }

    async remove(_id: string): Promise<Store> {
        const deletedStore = await this.storeModel.findById(_id).exec();
        if (!deletedStore) {
            throw new NotFoundException('Store not found');
        }
        await this.storeModel.findByIdAndDelete(_id);
        return deletedStore;
    }

    async findOne(_id: string): Promise<Store> {
        const store = await this.storeModel.findById(_id).exec();
        if (!store) {
            throw new NotFoundException('Store not found');
        }
        return store;
    }

    async findAll(): Promise<Store[]> {
        return await this.storeModel.find();
    }
}