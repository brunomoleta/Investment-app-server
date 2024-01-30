import { User } from '../../user/entities/user.entity';


export class Advisor extends User {
  experience!: string;

  constructor() {
    super();
  }

}
