import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CheckInParkingDto } from './dto/check-in.dto';
import { getCurrentTimeUTC } from '../utils/time';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckOutParkingDto } from './dto/check-out.dto';
import * as checkIn from './swagger/checkIn.swagger';
import * as checkOut from './swagger/checkOut.swagger';

@Controller('parking')
@ApiTags('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @ApiOkResponse(checkIn.ApiResponseSuccessNotes)
  @ApiBadRequestResponse(checkIn.ApiResponseBadRequestNotes)
  @Get('check-in/:id')
  async checkIn(@Param('id') id: string) {
    const checkInParkingDto: CheckInParkingDto = {
      checkIn: new Date(getCurrentTimeUTC()),
      checkOut: null,
      vehicle: { id: id },
    };
    console.log(checkInParkingDto);

    const haveCheckInOpen = await this.parkingService.getIfExistCheckinOpen(
      checkInParkingDto.vehicle.id,
    );
    if (haveCheckInOpen) {
      throw new HttpException(
        `There is already a check-in open for this vehicle id:${haveCheckInOpen.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.parkingService.checkIn(checkInParkingDto);
  }

  @Get('check-out/:id')
  @ApiOkResponse(checkOut.ApiResponseSuccessNotes)
  @ApiBadRequestResponse(checkOut.ApiResponseBadRequestNotes)
  async checkOut(@Param('id') id: string) {
    //TODO verify company ID, if is a owner
    const parking = await this.parkingService.findOneOrFail(id);
    if (parking.checkOut != null) {
      throw new HttpException(
        `Checkout has already been done in ${parking.checkOut}, it is not possible to do it again`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkOutParkingDto: CheckOutParkingDto = {
      parkingId: id,
      checkOut: new Date(getCurrentTimeUTC()),
    };
    return await this.parkingService.checkOut(checkOutParkingDto);
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
