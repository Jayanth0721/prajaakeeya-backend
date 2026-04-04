import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DateToTimestampInterceptor } from './common/interceptors/date-to-timestamp.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalInterceptors(new DateToTimestampInterceptor());
  app.enableCors({ origin: ['http://localhost:5173', 'https://main.d1kab1stclinb2.amplifyapp.com', 'https://prajaakeeya.in', 'https://www.prajaakeeya.in','https://lanch-dev.d1kab1stclinb2.amplifyapp.com','https://staging.d1kab1stclinb2.amplifyapp.com','https://staging.prajaakeeya.in'], credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Prajaakeeya API')
    .setDescription('API for Prajaakeeya ward voter selection')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('bba6b5eb2fa88335dshb834jhb3chq36', app, document);

  await app.listen(3000);
}

void bootstrap();
