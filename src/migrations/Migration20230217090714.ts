import { Migration } from '@mikro-orm/migrations';

export class Migration20230217090714 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `task` modify `done` tinyint(1) not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `task` modify `done` varchar(255) not null default false;');
  }

}
