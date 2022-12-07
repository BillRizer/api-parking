import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Parking } from '../parking/entities/parking.entity';
import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  let service: AnalyticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticService,
        {
          provide: getRepositoryToken(Parking),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AnalyticService>(AnalyticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
