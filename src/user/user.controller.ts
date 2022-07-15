import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getTasks() {
    return this.userService.getTask();
  }
}
