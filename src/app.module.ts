import { UserController } from './user/user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
})
export class AppModule {}
