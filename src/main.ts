import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`App start on PORT: ${process.env.PORT || 4000}`);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
