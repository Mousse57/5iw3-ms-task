import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateTaskRequest, Task } from 'stubs/task/v1alpha/task';
import { CreateTaskDto, toJs } from './dto/create-task.dto';
import { Status } from '@grpc/grpc-js/build/src/constants';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TaskService')
  async CreateTask(request: CreateTaskRequest): Promise<Task> {
    try {
      const task = await this.tasksService.create(
        new CreateTaskDto(request.task),
      );

      return { ...task, dueDate: task.dueDate.toISOString() } as any;
    } catch (error) {
      console.log({ error });
      if (error?.code === 'P2002') {
        throw new RpcException({
          code: Status.INVALID_ARGUMENT,
          message: request.task.name + ' is alreqdy taken',
        });
      }

      throw new RpcException(error);
    }
  }
}
