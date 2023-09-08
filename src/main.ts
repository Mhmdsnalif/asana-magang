import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  app.setGlobalPrefix('/api/v1');
  // handle validasi input global
  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(3000);
}
bootstrap();
