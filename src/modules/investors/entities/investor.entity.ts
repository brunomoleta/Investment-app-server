import { User } from '../../user/entities/user.entity';

export class Investor extends User {
  amount!: string;
  advisor_id!: string;

  constructor() {
    super();
    this.access_type = 'investor';
  }
}
