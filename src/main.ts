import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonInterceptor } from './common/common.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipUndefinedProperties: true,
    }),
  );

  app.useGlobalInterceptors(new CommonInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
