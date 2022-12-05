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

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  getProfile(@Request() req: RequestWithCompanty) {
    const companyId = req.user.companyId;
    if (!companyId) {
      throw new UnauthorizedException();
    }
    return this.companyService.findOne(companyId);
  }

  // // @Get()
  // // findAll() {
  // //   return this.companyService.findAll();
  // // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companyService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companyService.update(+id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyService.remove(+id);
  // }
}
