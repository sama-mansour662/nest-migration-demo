import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelRepository } from './repository/hotel.repository';

@Module({
  controllers: [HotelController],
  providers: [HotelService, HotelRepository],
})
export class HotelModule {}
