import { User } from '../../user/entities/user.entity';

export class Investor extends User {
  amount!: string;
  advisor!: string;

  constructor() {
    super();
    this.access_type = 'investor';
  }

}
