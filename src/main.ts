import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(
    process.env.main_port, 
    // process.env.main_host
  );
}
bootstrap();
