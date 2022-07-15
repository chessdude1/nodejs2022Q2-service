import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private tasks: Array<{ id: number; task: string }> = [
    { id: 1, task: 'first task' },
    { id: 2, task: 'second task' },
  ];

  getTask(): Array<{ id: number; task: string }> {
    return this.tasks;
  }
}
