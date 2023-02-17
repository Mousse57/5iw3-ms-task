import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Task } from './tasks/entities/task.entity';

export default {
  entities: [Task],
  password: 'rootpw',
  dbName: 'task',
  type: 'mysql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  driverOptions: {
    connection: {
      host: 'localhost',
      port: 3306,
    },
  },
} as MikroOrmModuleOptions;
