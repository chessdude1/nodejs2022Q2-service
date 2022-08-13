import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { IUser } from './user.interface';
import { validate } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDbEntity } from './entities/userDb.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDbEntity)
    private userRepository: Repository<UserDbEntity>,
  ) {}

  async getUsers(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async getUser(id: number): Promise<Omit<IUser, 'password'>> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedUser = await this.userRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findedUser;
  }

  async createUser(user: CreateUserDto): Promise<Omit<IUser, 'password'>> {
    const newUser = new User(user.login, user.password);

    return (await this.userRepository.save({ ...newUser })).toResponse();
  }

  async updateUser(
    id: number,
    userData: UpdateUserDto,
  ): Promise<Omit<IUser, 'password'>> {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userToUpdate.password !== userData.oldPassword) {
      throw new HttpException(
        'Old and new passwords doesnt match',
        HttpStatus.FORBIDDEN,
      );
    }

    userToUpdate.password = userData.newPassword;
    userToUpdate.version += 1;

    userToUpdate.updatedAt = +new Date();

    await this.userRepository.save(userToUpdate);
    return userToUpdate.toResponse();
  }

  async deleteUser(id: number) {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const userToRemove = await this.userRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!userToRemove) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.remove(userToRemove);

    return userToRemove;
  }
}
