import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TravelInsuranceController } from '../controllers/travel-insurance.controller';
import { TravelInsuranceService } from '../services/travel-insurance.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TravelInsuranceController],
  providers: [AppService, TravelInsuranceService],
})
export class AppModule {}