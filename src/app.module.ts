import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [TasksModule, MikroOrmModule.forRoot(mikroOrmConfig)],
})
export class AppModule {}
