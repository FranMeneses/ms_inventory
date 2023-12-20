import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';

class UpdateStoreProductDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  stock: number;
}

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateStoreProductDto)
  storeProducts: UpdateStoreProductDto[];
}