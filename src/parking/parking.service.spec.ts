import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Parking } from './entities/parking.entity';
import { ParkingService } from './parking.service';
import { CheckInParkingDto } from './dto/check-in.dto';
import { Repository } from 'typeorm';
import { mockCheckIn } from '../utils/mocks/parking';
import { CheckOutParkingDto } from './dto/check-out.dto';

const checkInData = {
  ...mockCheckIn,
};
const checkInEntity = new Parking(checkInData);

describe('ParkingService', () => {
  let parkingService: ParkingService;
  let parkingRepository: Repository<Parking>;

  let vehicleService: VehicleService;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingService,
        {
          provide: getRepositoryToken(Parking),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {},
        },
        {
          provide: VehicleService,
          useValue: {
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    parkingService = module.get<ParkingService>(ParkingService);
    parkingRepository = module.get<Repository<Parking>>(
      getRepositoryToken(Parking),
    );

    vehicleService = module.get<VehicleService>(VehicleService);
    vehicleRepository = module.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle),
    );
  });

  it('should be defined', () => {
    expect(parkingService).toBeDefined();
    expect(parkingRepository).toBeDefined();
    expect(vehicleService).toBeDefined();
    expect(vehicleRepository).toBeDefined();
  });

  describe('checkIn', () => {
    it('should create checkIn with vehicle', async () => {
      const checkIn: CheckInParkingDto = {
        checkIn: new Date(),
        vehicle: { id: 'not-found-uuid' },
        checkOut: null,
        company: { id: 'not-found-uuid' },
      };
      jest
        .spyOn(parkingRepository, 'save')
        .mockResolvedValueOnce(checkInEntity);

      const checked = await parkingService.checkIn(checkIn);

      expect(checked).toEqual(checkInEntity);
      expect(vehicleService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(parkingRepository.create).toHaveBeenCalledTimes(1);
      expect(parkingRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw exception when vehicle not found', async () => {
      const checkIn: CheckInParkingDto = {
        checkIn: new Date(),
        vehicle: { id: 'not-found-uuid' },
        checkOut: null,
        company: { id: 'not-found-uuid' },
      };

      jest
        .spyOn(vehicleService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const checked = parkingService.checkIn(checkIn);

      expect(checked).rejects.toThrowError();
      expect(vehicleService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(parkingRepository.create).toHaveBeenCalledTimes(0);
      expect(parkingRepository.save).toHaveBeenCalledTimes(0);
    });

    it('should throw exception', async () => {
      jest.spyOn(parkingService, 'checkIn').mockRejectedValueOnce(new Error());

      const checked = parkingService.checkIn({} as CheckInParkingDto);

      expect(checked).rejects.toThrowError();
    });

    describe('checkOut', () => {
      it('should set checkOut in parking ID', async () => {
        const checkOut: CheckOutParkingDto = {
          parkingId: 'fake-uuid',
          checkOut: new Date(),
        };
        jest
          .spyOn(parkingRepository, 'findOneOrFail')
          .mockResolvedValueOnce(checkInEntity);
        jest
          .spyOn(parkingRepository, 'save')
          .mockResolvedValueOnce(checkInEntity);

        const checked = await parkingService.checkOut(checkOut);

        expect(checked).toEqual(checkInEntity);
        expect(parkingRepository.findOneOrFail).toHaveBeenCalledTimes(1);
        expect(parkingRepository.merge).toHaveBeenCalledTimes(1);
        expect(parkingRepository.save).toHaveBeenCalledTimes(1);
      });

      it('should throw exception when vehicle not found', async () => {
        const checkOut: CheckOutParkingDto = {
          parkingId: 'fake-uuid',
          checkOut: new Date(),
        };

        jest
          .spyOn(vehicleService, 'findOneOrFail')
          .mockRejectedValueOnce(new Error());

        const checked = parkingService.checkOut(checkOut);

        expect(checked).rejects.toThrowError();
      });

      it('should throw exception', async () => {
        jest
          .spyOn(parkingService, 'checkOut')
          .mockRejectedValueOnce(new Error());

        const checked = parkingService.checkOut({} as CheckOutParkingDto);

        expect(checked).rejects.toThrowError();
      });
    });
  });
});
