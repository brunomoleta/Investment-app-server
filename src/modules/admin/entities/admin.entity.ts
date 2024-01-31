import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class Admin {
  readonly id: string;
  email!: string;

  @Exclude()
  is_super: boolean;

  @Exclude()
  password!: string;

  constructor() {
    this.id = randomUUID();
    this.is_super = true
  }
}
