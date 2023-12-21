import { IsString, IsOptional } from 'class-validator';
export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;
}