import { RefreshTokenDto } from './dto/refresh.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDbEntity } from 'src/user/entities/userDb.entity';
import { User } from 'src/user/user.entity';
import { UserAuthDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserDbEntity)
    private userRepository: Repository<UserDbEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: UserAuthDto) {
    const newUser = new User(signupData.login, signupData.password);

    await this.userRepository.save(newUser.createNewUserWitHashedPassword());

    return newUser.toResponse();
  }

  async login(loginData: UserAuthDto) {
    const { login, password } = loginData;

    const userFromDb = await this.userRepository.findOne({
      where: {
        login,
      },
    });

    const resultOfPasswordCompare = compareSync(password, userFromDb.password);

    if (!resultOfPasswordCompare || !userFromDb)
      throw new HttpException('Ошибка авторизации', HttpStatus.FORBIDDEN);

    const newTokens = this.generatePairOfTokens(
      userFromDb.id,
      userFromDb.login,
    );

    await this.userRepository.save({
      ...userFromDb,
      refreshToken: newTokens.refreshToken,
    });

    return newTokens;
  }

  async refresh(refreshData: RefreshTokenDto) {
    try {
      this.jwtService.verify(refreshData.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const userForRefreshing = await this.userRepository.findOne({
      where: {
        refreshToken: refreshData.refreshToken,
      },
    });

    const tokens = this.generatePairOfTokens(
      userForRefreshing.id,
      userForRefreshing.login,
    );

    await this.userRepository.save({
      ...userForRefreshing,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  private generatePairOfTokens(id: string, login: string) {
    const payload = { id, login };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
