import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJs Authentication API')
    .setDescription('Learning Authentication in NestJs')
    .setOpenAPIVersion('3.2.0')
    .setVersion('0.1.0')
    .addTag('App', 'Application endpoints')
    .addTag('Authentication', 'Authentication endpoints')
    .addTag('User', 'User profile stuff')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'openapi.json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
