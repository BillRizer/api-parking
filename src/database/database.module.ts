import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',

        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // synchronize: (process.env.DB_SYNCHRONIZE === 'true'),
        synchronize: true,
        useUTC: true,

        keepConnectionAlive: true,
        migrations: ['/migration/*.ts'],
        cli: { migrationsDir: 'migration' },
      }),
    }),
  ],
})
export class DatabaseModule {}
