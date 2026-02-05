import { Injectable } from '@nestjs/common';
import { HttpUtilService } from 'src/common/services/http/http.service';


@Injectable()
export class HotelRepository {
  private readonly omsBaseUrl = process.env.OMS_SERVICE_API_URL_INTERNAL!;
  constructor(private readonly httpUtilService: HttpUtilService) {}
  async getOrderByNumber(orderNumber: string): Promise<any> {
    try {
      return this.httpUtilService.get(
        `${this.omsBaseUrl}/order/order-number/${orderNumber}`,
        { params: { 'response-format': 'sdk' } },
      );

    } catch (error: any) {
      throw new Error(
        `Failed to fetch OMS order [orderNumber=${orderNumber}]: ${error?.message || error}`,
      );
    }
  }
}
