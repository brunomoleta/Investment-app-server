import { User } from '../../user/entities/user.entity';

export class Investor extends User {
  amount!: string;

  constructor() {
    super();
  }

}
