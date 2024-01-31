import { Admin } from '../../admin/entities/admin.entity';
import { Exclude } from 'class-transformer';

export class User extends Admin {
  name!: string;
  phone_number!: string;
  created_at!: string;
  updated_at!: string;
  image?: string;

  constructor() {
    super();
    this.is_super = false;
  }
}
