import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStoreProductDto {
    @IsNotEmpty()
    @IsString()
    id_store: string;

    @IsNotEmpty()
    @IsString()
    id_product: string;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    image: string;
}