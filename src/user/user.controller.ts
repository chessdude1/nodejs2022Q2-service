import { Controller, Get } from "@nestjs/common";

@Controller()
export class UserController {
  @Get()
  test() {
    return {result: 'All ok', status:200}
  }
}