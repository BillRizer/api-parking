import { PartialType } from '@nestjs/swagger';
import { CreateAnalyticDto } from './create-analytic.dto';

export class UpdateAnalyticDto extends PartialType(CreateAnalyticDto) {}
