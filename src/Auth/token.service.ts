import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { UserDbEntity } from 'src/user/entities/userDb.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { IRefreshToken } from './auth.interface';

import { RefreshTokensRepository } from './refresh-token.repository';

const BASE_OPTIONS: SignOptions = {
  issuer: 'https://my-app.com',
  audience: 'https://my-app.com',
};

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class TokensService {
  private readonly tokens: RefreshTokensRepository;
  private readonly jwt: JwtService;

  public constructor(
    tokens: RefreshTokensRepository,
    jwt: JwtService,
    @InjectRepository(UserDbEntity)
    private userRepository: Repository<UserDbEntity>,
  ) {
    this.tokens = tokens;
    this.jwt = jwt;
  }

  public async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    };

    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    user: User,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.tokens.createRefreshToken(user, expiresIn);

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.user_id),
    };

    return this.jwt.signAsync({}, opts);
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: User; token: IRefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new HttpException(
        'Refresh token not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (token.is_revoked) {
      throw new HttpException('Refresh token revoked', HttpStatus.BAD_REQUEST);
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new HttpException(
        'Refresh token malformed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException(
          'Refresh token expired',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Refresh token malformed',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new HttpException(
        'Refresh token malformed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userRepository.findOne({
      where: {
        id: String(subId),
      },
    });
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<IRefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new HttpException(
        'Refresh token malformed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.tokens.findTokenById(tokenId);
  }
}
