import { Injectable } from '@nestjs/common';
import { HotelRepository } from './repository/hotel.repository';
import { HotelInfoResponse } from './dto/HotelInfo';
import { HotelMapper } from './mappers/hotel.map';


@Injectable()
export class HotelService {
  constructor(private readonly hotelRepo: HotelRepository) {}

  async getHotelOrder(orderNumber: string): Promise<HotelInfoResponse> {
    try {
      const omsOrder = await this.hotelRepo.getOrderByNumber(orderNumber);
      const hotelProduct = omsOrder.products?.find(
        (p: any) => p.type === 'hotel',
      );

      if (!hotelProduct) {
        throw new Error('Hotel product not found in OMS response');
      }

      return HotelMapper.mapOrder(omsOrder, hotelProduct);
    } catch (error: any) {
      throw new Error(
        `Failed to get hotel order [orderNumber=${orderNumber}]: ${error?.message || error}`,
      );
    }
  }
}
