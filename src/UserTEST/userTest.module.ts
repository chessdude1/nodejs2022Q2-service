import { UserTestController } from './userTest.controller';
import { Module } from '@nestjs/common';
import { UserTestService } from './userTest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDbEntity } from './entities/userDb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbEntity])],
  controllers: [UserTestController],
  providers: [UserTestService],
})
export class UserTestModule {}
