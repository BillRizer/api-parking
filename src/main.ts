import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EEnvironments, getEnvironment } from './utils/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (getEnvironment() == EEnvironments.DEV) {
    console.log(getEnvironment());
    //use swagger for dev
    const config = new DocumentBuilder()
      .setTitle('Parking API')
      .setDescription('Parking API documentation')
      .setVersion('1.0')
      .addTag('routes')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
  }

  await app.listen(3000);
}
bootstrap();
