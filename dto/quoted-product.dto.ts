//DTOs para procesar los quotedProducts de la API

export class PromotionalOfferDto {
    code: string;
    description: string;
    percentage: string;
  }
  
export class AmountDto {
totalOriginal: number;
total: number;
}

export class QuotedProductDto {
productCode: string;
rateCode: string;
name: string;
description: string;
currency: string;
modality: string;
promotionalOffer: PromotionalOfferDto | null;
amount: AmountDto;
}  