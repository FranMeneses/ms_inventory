import { Body, Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { StoreProductMSG } from "src/utils/constants";
import { CreateStoreProductDto } from "./dto/create-store-product.dto";
import { UpdateStoreProductDto } from "./dto/update-store-product.dto";
import { StoreProductService } from "./store-product.service";

@Controller('')
export class StoreProductController {
    constructor(private readonly storeProductService: StoreProductService) {}

    @MessagePattern(StoreProductMSG.CREATE_STORE_PRODUCT)
    async create(@Body() createStoreProductDto: CreateStoreProductDto) {
        return await this.storeProductService.create(createStoreProductDto);
    }

    @MessagePattern(StoreProductMSG.UPDATE_STORE_PRODUCT)
    async update(@Payload('_id') _id: string, @Body() updateStoreProductDto: UpdateStoreProductDto) {
        return await this.storeProductService.update(_id, updateStoreProductDto);
    }

    @MessagePattern(StoreProductMSG.DELETE_STORE_PRODUCT)
    async remove(@Payload('_id') _id: string) {
        return await this.storeProductService.remove(_id);
    }

    @MessagePattern(StoreProductMSG.FIND_STORE_PRODUCT)
    async findOne(@Payload('_id') _id: string) {
        return await this.storeProductService.findOne(_id);
    }

    @MessagePattern(StoreProductMSG.FIND_ALL_STORE_PRODUCTS)
    async findAll() {
        return await this.storeProductService.findAll();
    }
}