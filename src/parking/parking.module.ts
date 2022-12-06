import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { VehicleModule } from '../vehicle/vehicle.module';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';

@Module({
  imports: [VehicleModule, TypeOrmModule.forFeature([Parking, Vehicle])],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
