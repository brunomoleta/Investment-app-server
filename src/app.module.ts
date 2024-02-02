import { Module } from '@nestjs/common';
import { AdminsModule } from './modules/admin/admins.module';
import { InvestorsModule } from './modules/investors/investors.module';
import { AdvisorsModule } from './modules/advisors/advisors.module';
import { SessionModule } from './modules/session/session.module';
import { InvestmentTypeModule } from './modules/investment_types/investmentType.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './decorators/roles.guard';

@Module({
  imports: [
    AdminsModule,
    InvestorsModule,
    AdvisorsModule,
    SessionModule,
    InvestmentTypeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
}
