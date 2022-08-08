import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/Auth/authGuard';

@Controller('/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<Omit<IUser, 'password'>> {
    return this.userService.createUser(user);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<Omit<IUser, 'password'>> {
    return this.userService.updateUser(id, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<Omit<IUser, 'password'>> {
    return this.userService.deleteUser(id);
  }
}
