import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateTaskRequest, Task } from 'stubs/task/v1alpha/task';
import { CreateTaskDto } from './dto/create-task.dto';
import { status } from '@grpc/grpc-js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TaskService')
  async createTask(request: CreateTaskRequest): Promise<Task> {
    try {
      const taskDto = new CreateTaskDto(request.task);
      const task = await this.tasksService.create(taskDto);

      return { ...task, dueDate: task.dueDate.toISOString() };
    } catch (error) {
      console.error(`Error creating task: ${error}`);
      
      if (error?.code === 'P2002') {
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: `${request.task.name} is already taken`,
        });
      }

      throw new RpcException(error);
    }
  }
}
