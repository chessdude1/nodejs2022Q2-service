import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserTestService } from './userTest.service';

@Controller('/userTest')
export class UserTestController {
  constructor(private userService: UserTestService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() user: any): any {
    return this.userService.createUser(user);
  }
}
