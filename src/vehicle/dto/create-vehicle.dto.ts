import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty({ message: 'Brand Field missing' })
  brand: string;

  @IsString()
  @IsNotEmpty({ message: 'Model Field missing' })
  model: string;

  @IsString()
  @IsNotEmpty({ message: 'Color Field missing' })
  color: string;

  @IsString()
  @IsNotEmpty({ message: 'Plate Field missing' })
  plate: string;

  @IsString()
  @IsNotEmpty({ message: 'Name Field missing' })
  type: string;
}
