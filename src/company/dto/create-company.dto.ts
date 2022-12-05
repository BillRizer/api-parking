import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @IsEmail()
  @IsNotEmpty({ message: 'E-mail Field missing' })
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty({ message: 'Name Field missing' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'cnpj Field missing' })
  cnpj: string;

  @IsString()
  @IsNotEmpty({ message: 'address Field missing' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'phone Field missing' })
  phone: string;

  @IsNumber()
  @IsNotEmpty({ message: 'max_amount_motorcycles Field missing' })
  max_amount_motorcycles: number;

  @IsNumber()
  @IsNotEmpty({ message: 'max_amount_cars Field missing' })
  max_amount_cars: number;
}
