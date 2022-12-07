import { Test, TestingModule } from '@nestjs/testing';
import { mockCheckIn } from '../utils/mocks/parking';
import { CheckInParkingDto } from './dto/check-in.dto';
import { Parking } from './entities/parking.entity';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

const checkInData = {
  ...mockCheckIn,
};
const checkInEntity = new Parking(checkInData);

describe('ParkingController', () => {
  let parkingController: ParkingController;
  let parkingService: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
        {
          provide: ParkingService,
          useValue: {
            checkIn: jest.fn(),
          },
        },
      ],
    }).compile();

    parkingController = module.get<ParkingController>(ParkingController);
    parkingService = module.get<ParkingService>(ParkingService);
  });

  it('should be defined', () => {
    expect(parkingController).toBeDefined();
    expect(parkingService).toBeDefined();
  });

  describe('checkIn', () => {
    it('should create checkin', async () => {
      const newCheckIn: CheckInParkingDto = {
        ...checkInData,
      };
      jest
        .spyOn(parkingService, 'checkIn')
        .mockResolvedValueOnce(checkInEntity);

      const checkIn = await parkingService.checkIn(newCheckIn);
      expect(checkIn).toEqual(newCheckIn);
    });
  });
});
