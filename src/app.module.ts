import { Module } from '@nestjs/common';
import { TaskModule } from './user/user.module';

@Module({
  imports: [TaskModule],
})
export class AppModule {}
