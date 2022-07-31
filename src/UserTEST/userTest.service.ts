import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserDbEntity } from './entities/userDb.entity';

@Injectable()
export class UserTestService {
  constructor(
    @InjectRepository(UserDbEntity)
    private userRepository: Repository<UserDbEntity>,
  ) {}

  async createUser(user: any): Promise<any> {
    const createdUser = this.userRepository.create(
      new User(user.login, user.password),
    );

    console.log(createdUser);

    return (await this.userRepository.save(createdUser)).toResponse();
  }
}
