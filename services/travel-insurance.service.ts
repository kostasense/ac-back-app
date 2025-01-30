import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthResponse, QuoteResponse } from '../src/interfaces/interfaces';
import { ConfigService } from '@nestjs/config';

interface RequestData {
  startDate: string;
  endDate: string;
  IATAcode: string;
  passengers: { birthdate: string }[];
}

@Injectable()
export class TravelInsuranceService {
  
  constructor(private configService: ConfigService) {}

  username = this.configService.get<string>('USNAME');
  password = this.configService.get<string>('PASSWORD');
  authUrl = this.configService.get<string>('AUTH_URL');
  quoteUrl = this.configService.get<string>('QUOTE_URL');

  async loginToGetToken(): Promise<string> {

    const credentials = {
      userName: this.username,
      password: this.password,
    };

    try {
      const response = await axios.post<AuthResponse>(
        this.authUrl!,
        credentials,
      );
      return response.data.data.token;
    } catch (error) {
      throw new Error('Error during authentication: ' + error.message);
    }
  }

  async getQuotedProducts(token: string, requestData: RequestData): Promise<QuoteResponse['data']['quotedProducts']> {

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      countryCode: 'MX',
      agencyCode: '97495',
      branchCode: 0,
      beginDate: requestData.startDate,
      endDate: requestData.endDate,
      quoteAnnual: null,
      travelType: null,
      multiTripModalityFilter: null,
      itinerary: {
        code: 'AIRPORT',
        origin: 'MEX',
        destination: requestData.IATAcode,
      },
      paymentMethod: 'CheckingAccount',
      passengers: requestData.passengers.map((p) => ({
        countryCode: 'MX',
        birthDate: p.birthdate,
      })),
      priceModifiers: {
        markup: null,
        comissionDiscount: null,
        promotionalCode: null,
      },
      language: 'es',
    };

    try {
      const response = await axios.post<QuoteResponse>(
        this.quoteUrl!,
        data,
        { headers },
      );
      return response.data.data.quotedProducts;
    } catch (error) {
      throw new Error('Error fetching quoted products: ' + error.message);
    }
  }
}