export interface IRefreshToken {
  user_id: string;
  is_revoked: boolean;
  expires: number;
}
