import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({ data: createTaskDto });
    return task;
  }

  // findAll() {
  //   return this.taskRepository.findAll();
  // }

  // findOne(id: number) {
  //   return this.taskRepository.findOne(id);
  // }

  // async update(id: number, updateTaskDto: UpdateTaskDto) {
  //   let task = await this.taskRepository.findOne(id);
  //   task = await this.taskRepository.assign(task, updateTaskDto);
  //   await this.taskRepository.flush();
  //   return task;
  // }

  // async changeStatus(id: number) {
  //   const task = await this.taskRepository.findOne(id);
  //   task.done = !task.done;
  //   await this.taskRepository.flush();
  //   return task;
  // }

  // async remove(id: number) {
  //   const task = await this.taskRepository.findOne(id);
  //   return this.taskRepository.removeAndFlush(task);
  // }
}
