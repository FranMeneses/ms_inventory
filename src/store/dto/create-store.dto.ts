import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStoreDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address: string;
}