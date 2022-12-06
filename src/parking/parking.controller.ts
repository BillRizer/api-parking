import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CheckInParkingDto } from './dto/check-in.dto';
import { getCurrentTimeUTC } from '../utils/time';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get('check-in/:id')
  async checkIn(@Param('id') id: string) {
    const checkInParkingDto: CheckInParkingDto = {
      checkIn: new Date(getCurrentTimeUTC()),
      checkOut: null,
      vehicle: { id: id },
    };
    return await this.parkingService.checkIn(checkInParkingDto);
  }

  // @Get()
  // findAll() {
  //   return this.parkingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
  //   return this.parkingService.update(+id, updateParkingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingService.remove(+id);
  // }
}
