import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  plate: string;

  @IsString()
  @IsOptional()
  type: string;
}
