import { PartialType } from '@nestjs/swagger';
import { CheckInParkingDto } from './check-in.dto';

export class UpdateParkingDto extends PartialType(CheckInParkingDto) {}
