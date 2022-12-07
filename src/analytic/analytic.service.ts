import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from '../parking/entities/parking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {}
  async dashboard(companyId: string) {
    const data = await this.parkingRepository.find({
      where: { company: { id: companyId } },
    });
    return data;
  }
}
