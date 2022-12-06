import { IsString } from 'class-validator';
import { Parking } from '../../parking/entities/parking.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @IsString()
  public brand: string;

  @Column()
  @IsString()
  public model: string;

  @Column()
  @IsString()
  public color: string;

  @Column({ unique: true })
  @IsString()
  public plate: string;

  @Column()
  @IsString()
  public type: string;

  @OneToMany((type) => Parking, (vehicle) => Vehicle, { nullable: true })
  Parking?: Parking;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: string;

  constructor(vehicle?: Partial<Vehicle>) {
    this.id = vehicle?.id;
    this.brand = vehicle?.brand;
    this.color = vehicle?.color;
    this.model = vehicle?.model;
    this.plate = vehicle?.plate;
    this.type = vehicle?.type;
    this.createdAt = vehicle?.createdAt;
    this.updatedAt = vehicle?.updatedAt;
    this.deletedAt = vehicle?.deletedAt;
  }
}
