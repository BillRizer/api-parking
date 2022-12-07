import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';
import RequestWithCompanty from '../auth/interface/request-with-company.interface';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  async getProfile(@Request() req: RequestWithCompanty): Promise<Company> {
    const companyId = req.user.companyId;
    if (!companyId) {
      throw new UnauthorizedException();
    }
    return await this.companyService.findOne(companyId);
  }

  @Patch()
  async update(
    @Request() req: RequestWithCompanty,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      const companyId = req.user.companyId;
      if (!companyId) {
        throw new UnauthorizedException();
      }
      return await this.companyService.update(companyId, updateCompanyDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  delete(@Request() req: RequestWithCompanty) {
    try {
      const companyId = req.user.companyId;
      if (!companyId) {
        throw new UnauthorizedException();
      }
      return this.companyService.deleteById(companyId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
