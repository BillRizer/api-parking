import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticController } from './analytic.controller';
import { AnalyticService } from './analytic.service';

describe('AnalyticController', () => {
  let controller: AnalyticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticController],
      providers: [AnalyticService],
    }).compile();

    controller = module.get<AnalyticController>(AnalyticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
