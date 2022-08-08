import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.getTokenFromHeader(context);
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err)
        throw new HttpException('Token is empty', HttpStatus.UNAUTHORIZED);
    });
    return true;
  }
  private getTokenFromHeader(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const tokenHeader = req.headers.authorization?.split(' ');
    if (!tokenHeader)
      throw new HttpException('Token is empty', HttpStatus.UNAUTHORIZED);
    const [bearer, token] = tokenHeader as string[];
    if (bearer !== 'Bearer' || !token)
      throw new HttpException('Token is empty', HttpStatus.UNAUTHORIZED);
    if (!process.env.JWT_SECRET_KEY)
      throw new HttpException('No secret key', HttpStatus.NOT_FOUND);
    return token;
  }
}
