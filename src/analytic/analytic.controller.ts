import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestWithCompanty from '../auth/interface/request-with-company.interface';
import { AnalyticService } from './analytic.service';
import { CreateAnalyticDto } from './dto/create-analytic.dto';
import { UpdateAnalyticDto } from './dto/update-analytic.dto';

@ApiTags('analytic')
@Controller('analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get('/dashboard')
  dashboard(@Request() req: RequestWithCompanty) {
    const companyId = req.user.companyId;

    return this.analyticService.dashboard(companyId);
  }
}
