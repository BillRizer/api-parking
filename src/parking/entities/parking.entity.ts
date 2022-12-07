import { IsDate, IsOptional, IsString } from 'class-validator';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Parking {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @IsDate()
  public checkIn: Date;

  @Column({ nullable: true, default: null })
  @IsDate()
  public checkOut: Date;

  @ManyToOne((type) => Vehicle, (parking) => Parking, { nullable: false })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @ManyToOne((type) => Company, (parking) => Parking, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: string;

  constructor(parking?: Partial<Parking>) {
    this.id = parking?.id;
    this.checkIn = parking?.checkIn;
    this.checkOut = parking?.checkOut;
    this.vehicle = parking?.vehicle;
    this.company = parking?.company;
    this.createdAt = parking?.createdAt;
    this.updatedAt = parking?.updatedAt;
    this.deletedAt = parking?.deletedAt;
  }
}
