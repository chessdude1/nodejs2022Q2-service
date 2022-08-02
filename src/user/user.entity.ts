import { IUser } from './user.interface';
import { v4 as uuidv4 } from 'uuid';

export class User implements IUser {
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  id = uuidv4();
  password: string;
  login: string;
  version = 1;
  createdAt = new Date().getTime();
  updatedAt = new Date().getTime();

  toResponse = () => {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: Number(this.createdAt),
      updatedAt: Number(this.updatedAt),
    };
  };
}
