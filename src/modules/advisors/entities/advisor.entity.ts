import { User } from '../../user/entities/user.entity';


export class Advisor extends User {
  experience!: string;

  speciality: string;

  constructor() {
    super();
    this.access_type = 'advisor';
  }

}
