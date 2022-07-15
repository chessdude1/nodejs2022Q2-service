import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryStore } from 'src/inMemoryDataBase/dataBase';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { IUser } from './user.interface';
import { validate } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: Array<IUser> = InMemoryStore.users;

  getUsers(): Array<IUser> {
    return this.users;
  }

  getUser(id: number): IUser {
    const findedUser = this.users.find((user) => +user.id === id);

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    return findedUser;
  }

  createUser(user: CreateUserDto): IUser {
    const newUser = new User(user.login, user.password);
    this.users.push({ ...newUser });
    return newUser;
  }

  updateUser(id: number, userData: UpdateUserDto): IUser {
    const findedUser = this.users.find((user) => +user.id === id);

    if (findedUser.password !== userData.oldPassword) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    //delete user with put id
    this.users.filter((user) => +user.id === id);

    // create user with updated data
    const userWithNewPassword = {
      ...findedUser,
      password: userData.newPassword,
      updatedAt: new Date().getTime(),
      version: findedUser.version + 1,
    };

    this.users.push(userWithNewPassword);

    return userWithNewPassword;
  }

  deleteUser(id: number) {
    const findedUser = this.users.find((user) => +user.id === id);

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    this.users.filter((user) => +user.id === id);

    return findedUser;
  }
}
