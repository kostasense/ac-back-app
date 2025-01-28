import { Body, Controller, Post } from '@nestjs/common';
import { TravelInsuranceService } from '../services/travel-insurance.service';
import { RequestDto } from '../dto/request.dto';
import { QuotedProductDto } from '../dto/quoted-product.dto';

@Controller('api/related-products')
export class TravelInsuranceController {
  constructor(private readonly travelInsuranceService: TravelInsuranceService) {}

  @Post()
  async getRelatedProducts(@Body() requestData: RequestDto): Promise<QuotedProductDto[]> {

    // Obtener token de autorizacion
    const token = await this.travelInsuranceService.loginToGetToken();

    // Obtener los quotedProducts con el token y la requestData
    const quotedProducts = await this.travelInsuranceService.getQuotedProducts(
      token,
      requestData,
    );

    // Devolver los quotedProducts a la app en Next.js
    return quotedProducts.map((product) => {
        if (product.promotionalOffer === null) {
          return {
            productCode: product.productCode,
            rateCode: product.rateCode,
            name: product.name,
            description: product.description,
            currency: product.currency,
            modality: product.modality,
            promotionalOffer: null,
            amount: {
              totalOriginal: product.amount?.totalOriginal,
              total: product.amount?.total,
            },
          };
        }
      
        return {
          productCode: product.productCode,
          rateCode: product.rateCode,
          name: product.name,
          description: product.description,
          currency: product.currency,
          modality: product.modality,
          promotionalOffer: {
            code: product.promotionalOffer.code,
            description: product.promotionalOffer.description,
            percentage: product.promotionalOffer.percentage,
          },
          amount: {
            totalOriginal: product.amount?.totalOriginal,
            total: product.amount?.total,
          },
        };
      });      
  }
}
