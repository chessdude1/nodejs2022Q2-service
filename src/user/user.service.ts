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
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedUser = this.users.find((user) => user.id === String(id));

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findedUser;
  }

  createUser(user: CreateUserDto): IUser {
    const newUser = new User(user.login, user.password);
    this.users.push({ ...newUser });
    const userResponse = { ...newUser };

    delete userResponse.password;

    return userResponse;
  }

  updateUser(id: number, userData: UpdateUserDto): IUser {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedUser = this.users.find((user) => user.id === String(id));

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (findedUser.password !== userData.oldPassword) {
      throw new HttpException(
        'Old and new passwords doesnt match',
        HttpStatus.FORBIDDEN,
      );
    }

    //delete user with put id
    this.users = this.users.filter((user) => user.id !== String(id));

    // create user with updated data
    const userWithNewPassword = {
      ...findedUser,
      password: userData.newPassword,
      updatedAt: new Date().getTime(),
      version: findedUser.version + 1,
    };

    this.users.push(userWithNewPassword);

    const responseUserWithNewPassword = { ...userWithNewPassword };
    delete responseUserWithNewPassword.password;

    return responseUserWithNewPassword;
  }

  deleteUser(id: number) {
    if (!validate(String(id))) {
      throw new HttpException('Not valid uuid', HttpStatus.BAD_REQUEST);
    }

    const findedUser = this.users.find((user) => user.id === String(id));

    if (!findedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.users = this.users.filter((user) => user.id !== String(id));

    return findedUser;
  }
}
