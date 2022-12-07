import { Module } from '@nestjs/common';
import { AnalyticService } from './analytic.service';
import { AnalyticController } from './analytic.controller';
import { ParkingModule } from 'src/parking/parking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from 'src/parking/entities/parking.entity';

@Module({
  imports: [ParkingModule, TypeOrmModule.forFeature([Parking])],
  controllers: [AnalyticController],
  providers: [AnalyticService],
})
export class AnalyticModule {}
