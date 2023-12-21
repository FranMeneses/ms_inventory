import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { StoreProduct } from "./schema/store-product.schema";
import { CreateStoreProductDto } from "./dto/create-store-product.dto";
import { Model } from "mongoose";
import { UpdateStoreProductDto } from "./dto/update-store-product.dto";

@Injectable()
export class StoreProductService {
    constructor(
        @InjectModel(StoreProduct.name) private readonly storeProductModel: Model<StoreProduct>,
    ) {}

    async create(storeProduct: CreateStoreProductDto): Promise<StoreProduct> {
        const newStoreProduct = await this.storeProductModel.create(storeProduct);
        return newStoreProduct;
    }

    async update(_id: string, storeProduct: UpdateStoreProductDto): Promise<StoreProduct> {
        const updatedStoreProduct = await this.storeProductModel.findByIdAndUpdate(
            _id,
            storeProduct,
            { new: true },
        );
        return updatedStoreProduct;
    }

    async remove(_id: string): Promise<StoreProduct> {
        const deletedStoreProduct = await this.storeProductModel.findById(_id).exec();
        if (!deletedStoreProduct) {
            throw new NotFoundException('StoreProduct not found');
        }
        await this.storeProductModel.findByIdAndDelete(_id);
        return deletedStoreProduct;
    }

    async findOne(_id: string): Promise<StoreProduct> {
        const storeProduct = await this.storeProductModel.findById(_id).exec();
        if (!storeProduct) {
            throw new NotFoundException('StoreProduct not found');
        }
        return storeProduct;
    }

    async findAll(): Promise<StoreProduct[]> {
        return await this.storeProductModel.find();
    }

    async getProductDetails(id_store: string, id_product: string): Promise<StoreProduct> {
        const storeProduct = await this.storeProductModel.findOne({ id_store, id_product }).exec();
        if (!storeProduct) {
            throw new NotFoundException('StoreProduct not found');
        }
        return storeProduct;
    }
}