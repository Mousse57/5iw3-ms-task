import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTaskRequest, Task } from 'stubs/task/v1alpha/task';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TaskService')
  async CreateTask(request: CreateTaskRequest): Promise<Task> {
    const { task } = request;
    console.log({ task });

    return task;
  }
}
