import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey()
  id: string = uuidv4(); // UUIDs are supported out-of-the-box

  @Property()
  username!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property()
  createdAt: Date = new Date();

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}
