import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { CompanyModule } from './company/company.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ParkingModule } from './parking/parking.module';
import { AnalyticModule } from './analytic/analytic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.TYPE_ENV}`,
      isGlobal: true,
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        BCRYPT_SALT: Joi.number().required(),
      }),
    }),

    DatabaseModule,
    AuthModule,
    CompanyModule,
    EncryptModule,
    VehicleModule,
    ParkingModule,
    AnalyticModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
