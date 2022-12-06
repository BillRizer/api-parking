import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { mockVehicle } from '../utils/mocks/vehicle';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { NotFoundException } from '@nestjs/common';

const vehicleData = {
  ...mockVehicle,
};
const vehicleEntity = new Vehicle(vehicleData);

describe('VehicleService', () => {
  let vehicleService: VehicleService;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            findOneOrFail: jest.fn(),
            merge: jest.fn(),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    vehicleService = module.get<VehicleService>(VehicleService);
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(vehicleService).toBeDefined();
    expect(vehicleRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create new vehicle', async () => {
      const vehicle: CreateVehicleDto = {
        ...mockVehicle,
      };
      jest.spyOn(vehicleService, 'findByPlate').mockResolvedValueOnce(null);
      jest
        .spyOn(vehicleRepository, 'save')
        .mockResolvedValueOnce(vehicleEntity);

      const created = await vehicleService.create(vehicle);

      expect(created).toEqual(vehicle);
    });
    it('should throw expection when vehicle already exists', async () => {
      const localVehicle: CreateVehicleDto = {
        ...mockVehicle,
      };
      jest
        .spyOn(vehicleService, 'findByPlate')
        .mockResolvedValueOnce(vehicleEntity);

      expect(vehicleService.create(localVehicle)).rejects.toThrowError();
    });
    it('should throw expection', async () => {
      const localVehicle: CreateVehicleDto = {
        ...mockVehicle,
      };
      jest.spyOn(vehicleService, 'findByPlate').mockResolvedValueOnce(null);
      jest.spyOn(vehicleRepository, 'save').mockRejectedValueOnce(new Error());

      expect(vehicleService.create(localVehicle)).rejects.toThrowError();
    });
  });

  describe('findByPlate', () => {
    it('should found vehicle by plate', async () => {
      jest
        .spyOn(vehicleRepository, 'findOneBy')
        .mockResolvedValueOnce(vehicleEntity);

      expect(await vehicleService.findByPlate('true-plate')).toEqual(
        vehicleEntity,
      );
    });

    it('should not found vehicle by plate', async () => {
      jest.spyOn(vehicleRepository, 'findOneBy').mockResolvedValueOnce(null);

      expect(await vehicleService.findByPlate('true-plate')).toBeNull();
    });
  });

  describe('update', () => {
    it('should update vehicle by id', async () => {
      const localUpdateVehicle: UpdateVehicleDto = {
        ...mockVehicle,
        color: 'yellow',
      };
      const localUpdateVehicleEntity = new Vehicle(localUpdateVehicle);
      jest
        .spyOn(vehicleRepository, 'findOneOrFail')
        .mockResolvedValueOnce(localUpdateVehicleEntity);
      jest
        .spyOn(vehicleRepository, 'save')
        .mockResolvedValueOnce(localUpdateVehicleEntity);

      expect(
        await vehicleService.update('fake-vehicle-id', localUpdateVehicle),
      ).toEqual(localUpdateVehicleEntity);
      expect(vehicleRepository.merge).toHaveBeenCalledTimes(1);
      expect(vehicleRepository.save).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception when id not found', async () => {
      const localUpdateVehicle: UpdateVehicleDto = {
        ...mockVehicle,
        color: 'yellow',
      };
      jest
        .spyOn(vehicleRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const result = vehicleService.update(
        'not-found-uuid',
        localUpdateVehicle,
      );

      expect(result).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete vehicle', async () => {
      jest
        .spyOn(vehicleRepository, 'findOneOrFail')
        .mockResolvedValue(vehicleEntity);

      const deleted = await vehicleService.deleteById('found-uuid');

      expect(deleted).toBeUndefined();
      expect(vehicleRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(vehicleRepository.softDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw exception when not found', async () => {
      jest
        .spyOn(vehicleRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const deleted = vehicleService.deleteById('not-found-uuid');

      expect(deleted).rejects.toThrowError(NotFoundException);
      expect(vehicleRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(vehicleRepository.softDelete).toHaveBeenCalledTimes(0);
    });

    it('should throw exception', async () => {
      jest
        .spyOn(vehicleRepository, 'findOneOrFail')
        .mockResolvedValue(vehicleEntity);
      jest
        .spyOn(vehicleRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());

      const deleted = vehicleService.deleteById('founded-uuid');

      expect(deleted).rejects.toThrowError();
      expect(vehicleRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });
  });
});
