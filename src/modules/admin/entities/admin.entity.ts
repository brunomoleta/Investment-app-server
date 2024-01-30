import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class Admin {
  readonly id: string;
  email!: string;
  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
