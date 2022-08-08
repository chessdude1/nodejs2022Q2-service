import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDbEntity } from 'src/user/entities/userDb.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbEntity])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
