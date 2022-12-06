import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { mockVehicle } from '../utils/mocks/vehicle';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';

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
});
