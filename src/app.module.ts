import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TravelInsuranceController } from '../controllers/travel-insurance.controller';
import { TravelInsuranceService } from '../services/travel-insurance.service';

@Module({
  imports: [],
  controllers: [AppController, TravelInsuranceController],
  providers: [AppService, TravelInsuranceService],
})
export class AppModule {}