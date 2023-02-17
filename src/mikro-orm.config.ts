import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Task } from './tasks/entities/task.entity';
import dotenv from 'dotenv';

dotenv.config();

export default {
  entities: [Task],
  type: 'mysql',
  dbName: 'task',
  clientUrl: process.env.DB_URL,
} as MikroOrmModuleSyncOptions;
