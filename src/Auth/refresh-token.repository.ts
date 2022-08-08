import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDbEntity } from 'src/user/entities/userDb.entity';
import { Repository } from 'typeorm';
import { RefreshTokenDbEntity } from './entities/refreshTokenDbEntity.entity';
import { RefreshToken } from './refreshToken.entity';

@Injectable()
export class RefreshTokensRepository {
  constructor(
    @InjectRepository(RefreshTokenDbEntity)
    private refreshTokenRepository: Repository<RefreshTokenDbEntity>,
  ) {}

  async createRefreshToken(
    user: UserDbEntity,
    ttl: number,
  ): Promise<RefreshToken> {
    const token = new RefreshToken(user.id, false, ttl);

    await this.refreshTokenRepository.save({ ...token });
    return token;
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findOne({
      where: {
        id,
      },
    });
  }
}
