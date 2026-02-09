import { Injectable } from '@nestjs/common';
import { OmsRepository } from 'src/common/repositories/oms.repository';

@Injectable()
export class HotelRepository {
  constructor(private readonly omsRepository: OmsRepository) {}

  async getOrderByNumber(orderNumber: string): Promise<any> {
    return this.omsRepository.getOrderByNumber(orderNumber);
  }
}
