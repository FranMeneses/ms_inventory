import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateStoreProductDto {
    @IsOptional()
    @IsString()
    id_store: string;

    @IsOptional()
    @IsString()
    id_product: string;

    @IsOptional()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    image: string;
}