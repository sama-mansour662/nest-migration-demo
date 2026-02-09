import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../services/http/http.service';

export interface OmsOrderResponse {
  id?: string;
  orderId?: string;
  orderNumber?: string;
  products?: Array<{
    type: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

@Injectable()
export class OmsRepository {
  private readonly baseUrl: string;

  constructor(private readonly httpUtilService: HttpUtilService) {
    this.baseUrl = process.env.OMS_SERVICE_API_URL_INTERNAL || '';
    if (!this.baseUrl) {
      throw new Error('OMS_SERVICE_API_URL_INTERNAL is not defined');
    }
  }

 
  async getOrderByNumber(orderNumber: string): Promise<OmsOrderResponse> {
    try {
      return await this.httpUtilService.get<OmsOrderResponse>(
        `${this.baseUrl}/order/order-number/${orderNumber}`,
        { params: { 'response-format': 'sdk' } },
      );
    } catch (error: any) {
      throw new Error(
        `Failed to fetch OMS order [orderNumber=${orderNumber}]: ${error?.message || error}`,
      );
    }
  }

  /**
   * Get order by order ID
   */
  async getOrderById(orderId: string): Promise<OmsOrderResponse> {
    try {
      return await this.httpUtilService.get<OmsOrderResponse>(
        `${this.baseUrl}/order/${orderId}`,
        { params: { 'response-format': 'sdk' } },
      );
    } catch (error: any) {
      throw new Error(
        `Failed to fetch OMS order [orderId=${orderId}]: ${error?.message || error}`,
      );
    }
  }

  
}