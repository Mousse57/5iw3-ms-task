import { Migration } from '@mikro-orm/migrations';

export class Migration20230216112838 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `task` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `due_date` datetime not null, `done` varchar(255) not null default false) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `task` add unique `task_name_unique`(`name`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `task`;');
  }

}
