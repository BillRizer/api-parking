import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return await this.vehicleRepository.findOneBy({ plate: plate });
  }

  async update(vehicleId: string, updateVehicleDto: UpdateVehicleDto) {
    try {
      const vehicle = await this.findOneOrFail(vehicleId);

      this.vehicleRepository.merge(vehicle, updateVehicleDto);
      return await this.vehicleRepository.save(vehicle);
    } catch (error) {
      //TODO: add in log
      // error. sqlMessage and error.sql
      if (error.code === 'ER_DUP_ENTRY') {
        throw new NotFoundException(
          'Could not update, this plate alwaready exists',
        );
      }
    }
  }

  async findOneOrFail(id: string): Promise<Vehicle> {
    try {
      return await this.vehicleRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException('Could not find this Vehicle');
    }
  }

  async deleteById(vehicleId: string) {
    await this.findOneOrFail(vehicleId);
    await this.vehicleRepository.softDelete(vehicleId);
  }
  // findAll() {
  //   return `This action returns all vehicle`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} vehicle`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vehicle`;
  // }
}
