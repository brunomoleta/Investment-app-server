import { User } from '../../user/entities/user.entity';


export class Advisor extends User {
  experience!: string;

  speciality_id: string;

  constructor() {
    super();
    this.access_type = 'advisor';
  }

}
