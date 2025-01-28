import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, QuoteResponse } from '../src/interfaces';

interface RequestData {
  startDate: string;
  endDate: string;
  IATAcode: string;
  passengers: { birthdate: string }[];
}

@Injectable()
export class TravelInsuranceService {
  constructor(private readonly configService: ConfigService) {}

  async loginToGetToken(): Promise<string> {
    // Obtén las credenciales desde las variables de entorno
    const userName = this.configService.get<string>('USERNAME')!;
    const password = this.configService.get<string>('PASSWORD')!;
    const authUrl = this.configService.get<string>('AUTH_URL')!;

    const credentials = { userName, password };

    try {
      const response = await axios.post<AuthResponse>(authUrl, credentials);
      return response.data.data.token;
    } catch (error) {
      throw new Error('Error during authentication: ' + error.message);
    }
  }

  async getQuotedProducts(token: string, requestData: RequestData): Promise<QuoteResponse['data']['quotedProducts']> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const quoteUrl = this.configService.get<string>('QUOTE_URL')!;

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
      const response = await axios.post<QuoteResponse>(quoteUrl, data, { headers });
      return response.data.data.quotedProducts;
    } catch (error) {
      throw new Error('Error fetching quoted products: ' + error.message);
    }
  }
}