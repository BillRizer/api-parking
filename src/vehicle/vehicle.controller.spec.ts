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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn().mockResolvedValue(vehicleEntity),
            findByPlate: jest.fn().mockResolvedValue(vehicleEntity),
          },
        },
      ],
    }).compile();

    vehicleController = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(vehicleController).toBeDefined();
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
});
