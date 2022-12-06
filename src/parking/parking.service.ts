import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleService } from '../vehicle/vehicle.service';
import { Repository } from 'typeorm';
import { CheckInParkingDto } from './dto/check-in.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
    private vehicleService: VehicleService,
  ) {}

  async checkIn(checkInParkingDto: CheckInParkingDto) {
    try {
      //TODO prevent same checkin without checkout yet
      const vehicle = await this.vehicleService.findOneOrFail(
        checkInParkingDto.vehicle.id,
      );

      const created = await this.parkingRepository.create({
        ...checkInParkingDto,
      });
      return await this.parkingRepository.save(created);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async findOneOrFail(id: string): Promise<Parking> {
  //   try {
  //     return await this.parkingRepository.findOneOrFail({ where: { id: id } });
  //   } catch (error) {
  //     throw new NotFoundException('Could not find this Vehicle');
  //   }
  // }

  // findAll() {
  //   return `This action returns all parking`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} parking`;
  // }

  // update(id: number, updateParkingDto: UpdateParkingDto) {
  //   return `This action updates a #${id} parking`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} parking`;
  // }
}
