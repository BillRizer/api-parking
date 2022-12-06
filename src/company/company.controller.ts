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
} from '@nestjs/common';
import { Public } from '../auth/decorator/public.decorator';
import RequestWithCompanty from '../auth/interface/request-with-company.interface';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  getProfile(@Request() req: RequestWithCompanty): Promise<Company> {
    const companyId = req.user.companyId;
    if (!companyId) {
      throw new UnauthorizedException();
    }
    return this.companyService.findOne(companyId);
  }

  @Patch()
  update(
    @Request() req: RequestWithCompanty,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const companyId = req.user.companyId;
    if (!companyId) {
      throw new UnauthorizedException();
    }
    return this.companyService.update(companyId, updateCompanyDto);
  }
}
