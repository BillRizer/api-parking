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
  Res,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('vehicle')
@ApiTags('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    try {
      return await this.vehicleService.create(createVehicleDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.vehicleService.findOneOrFail(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    try {
      return await this.vehicleService.update(id, updateVehicleDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Vehicle removed successfully',
  })
  @ApiBadRequestResponse({ description: 'Could not find this Vehicle' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.vehicleService.deleteById(id);
      // res.status(HttpStatus.OK).send();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
