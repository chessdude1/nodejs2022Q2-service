import { RefreshTokenDto } from './dto/refresh.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserAuthDto } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() signupData: UserAuthDto) {
    return this.authService.signup(signupData);
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginData: UserAuthDto) {
    return this.authService.login(loginData);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post('/refresh')
  refresh(@Body() refreshData: RefreshTokenDto): Promise<any> {
    return this.authService.refresh(refreshData);
  }
}
