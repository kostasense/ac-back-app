// src/interfaces.ts

export interface AuthResponse {
    traceId: string;
    isSuccess: boolean;
    data: {
      token: string;
      expiration: string;
    };
  }
  
  export interface QuoteResponse {
    traceId: string;
    isSuccess: boolean;
    data: {
      destinationArea: string;
      exchangeRate: number;
      productsURL: string;
      processingFee: number | null;
      quotedProducts: Array<{
        productCode: string;
        rateCode: string;
        name: string;
        description: string;
        currency: string;
        modality: string;
        promotionalOffer: {
          code: string;
          description: string;
          percentage: string;
        };
        amount: {
          totalOriginal: number;
          total: number;
        };
      }>;
    };
  }  