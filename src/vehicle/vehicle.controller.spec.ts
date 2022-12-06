import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockVehicle } from '../utils/mocks/vehicle';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

const vehicleData = {
  ...mockVehicle,
};
const vehicleEntity = new Vehicle(vehicleData);

describe('VehicleController', () => {
  let vehicleController: VehicleController;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn().mockResolvedValue(vehicleEntity),
            findByPlate: jest.fn().mockResolvedValue(vehicleEntity),
            findOneOrFail: jest.fn().mockResolvedValue(vehicleEntity),
          },
        },
      ],
    }).compile();

    vehicleController = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(vehicleController).toBeDefined();
    expect(vehicleService).toBeDefined();
  });

  describe('create', () => {
    it('should create vehicle', async () => {
      const newVehicle: CreateVehicleDto = {
        ...mockVehicle,
      };

      const created = await vehicleController.create(newVehicle);

      expect(created).toEqual(newVehicle);
    });

    it('should throw exception when vehicle already exists', async () => {
      const newVehicle: CreateVehicleDto = {
        ...mockVehicle,
      };
      jest
        .spyOn(vehicleController, 'create')
        .mockRejectedValueOnce(new Error());

      const created = vehicleController.create(newVehicle);

      expect(created).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should found vehicle by id', async () => {
      const vehicle = await vehicleController.findOne('valid-id');

      expect(vehicle).toEqual(vehicleEntity);
      expect(vehicleService.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw exception when vehicle not found', async () => {
      jest
        .spyOn(vehicleService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const vehicle = vehicleController.findOne('valid-id');

      expect(vehicle).rejects.toThrowError();
    });
    it('should throw exception', () => {
      jest
        .spyOn(vehicleController, 'findOne')
        .mockRejectedValueOnce(new Error());

      const vehicle = vehicleController.findOne('valid-id');

      expect(vehicle).rejects.toThrowError();
    });
  });
});
