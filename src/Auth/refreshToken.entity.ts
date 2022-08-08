import { IRefreshToken } from './auth.interface';

export class RefreshToken implements IRefreshToken {
  constructor(user_id: string, is_revoked: boolean, expiration: number) {
    this.user_id = user_id;
    this.is_revoked = is_revoked;
    this.expires = new Date().getTime() + expiration;
  }

  user_id: string;
  is_revoked: boolean;
  expires: number;
}
