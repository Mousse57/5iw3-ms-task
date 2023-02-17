import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTaskRequest, Task } from 'stubs/task/v1alpha/task';
import { CreateTaskDto, toJs } from './dto/create-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TaskService')
  async CreateTask(request: CreateTaskRequest): Promise<Task> {
    const task = await this.tasksService.create(
      new CreateTaskDto(request.task),
    );

    return { ...task, dueDate: task.dueDate.toISOString() } as any;
  }
}
