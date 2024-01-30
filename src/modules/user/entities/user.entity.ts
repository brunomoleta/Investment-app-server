import { Admin } from '../../admin/entities/admin.entity';

export class User extends Admin {
  name!: string;
  phone_number!: string;
  created_at!: string;
  updated_at!: string;
  image?: string;
  constructor() {
    super();
  }
}
