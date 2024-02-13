import { Advisor } from './entities/advisor.entity';

export interface RetrieveInfo {
  page: number;
  perPage: number;
}
export interface RetrieveAdvisors {
  advisors: Advisor[];
  info: RetrieveInfo;
}
