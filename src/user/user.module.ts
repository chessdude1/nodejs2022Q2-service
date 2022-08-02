import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDbEntity } from './entities/userDb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
