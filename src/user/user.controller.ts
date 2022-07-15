import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class UserController {
  private tasks: Array<{ id: number; task: string }> = [
    { id: 1, task: 'first task' },
    { id: 2, task: 'second task' },
  ];

  @Get('1')
  @HttpCode(206)
  getTasks() {
    return { result: 'All okkk', status: 200 };
  }
}
