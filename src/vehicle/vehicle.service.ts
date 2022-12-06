import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      if (await this.findByPlate(createVehicleDto.plate)) {
        throw new Error('Vehicle already exists.');
      }
      const created = await this.vehicleRepository.create({
        ...createVehicleDto,
      });
      return await this.vehicleRepository.save(created);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByPlate(plate: string) {
    return await this.vehicleRepository.findOneBy({ plate: plate });
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
