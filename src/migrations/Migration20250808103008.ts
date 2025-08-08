import { Migration } from '@mikro-orm/migrations';

export class Migration20250808103008 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) not null, "username" varchar(255) not null, "email" text not null, "created_at" timestamptz not null, constraint "user_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
