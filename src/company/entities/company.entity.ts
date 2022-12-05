import { Exclude } from 'class-transformer';
import { IsNumber, MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  @MinLength(7)
  @MaxLength(120)
  public password: string;

  @Column()
  @MaxLength(64)
  public name: string;

  @Column()
  @MaxLength(14)
  public cnpj: string;

  @Column()
  @MaxLength(255)
  public address: string;

  @Column()
  @MaxLength(13)
  public phone: string;

  @Column()
  @IsNumber()
  public max_amount_motorcycles: number;

  @Column()
  @IsNumber()
  public max_amount_cars: number;

  @CreateDateColumn()
  public createdAt: string;

  @UpdateDateColumn()
  public updatedAt: string;

  constructor(company?: Partial<Company>) {
    this.id = company?.id;
    this.name = company?.name;
    this.email = company?.email;
    this.address = company?.address;
    this.cnpj = company?.cnpj;
    this.max_amount_cars = company?.max_amount_cars;
    this.max_amount_motorcycles = company?.max_amount_motorcycles;
    this.password = company?.password;
    this.phone = company?.phone;
    this.createdAt = company?.createdAt;
    this.updatedAt = company?.updatedAt;
  }
}
