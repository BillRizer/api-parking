import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EEnvironments, getEnvironment } from './utils/helpers';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const versionApi = 'api/v1';

  app.setGlobalPrefix(versionApi);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  if (getEnvironment() == EEnvironments.DEV) {
    const config = new DocumentBuilder()
      .setTitle('Parking API')
      .setDescription('Parking API documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(versionApi, app, document);
  }

  await app.listen(3000);
}
bootstrap();
