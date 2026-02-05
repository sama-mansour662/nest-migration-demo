import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HotelInfoResponse } from './dto/HotelInfo';
import { HotelService } from './hotel.service';

@Controller({ path: 'hotel', version: '1' })
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard)
  @Post('hotel-info/:bookingId')
  async getHotelByBookingId(
    @Param('bookingId') bookingId: string,
  ): Promise<HotelInfoResponse> {
    // In this codebase, bookingId maps to OMS orderNumber.
    return this.hotelService.getHotelOrder(bookingId);
  }
}
