import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HotelInfoResponse } from './dto/HotelInfo';
import { HotelService } from './hotel.service';

@ApiTags('Hotel')
@ApiBearerAuth('bearer')
@Controller({ path: 'hotel', version: '1' })
@UseGuards(JwtAuthGuard)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('hotel-info/:bookingId')
  async getHotelByBookingId(
    @Param('bookingId') bookingId: string,
  ): Promise<HotelInfoResponse> {
    if (!bookingId?.trim()) {
      throw new BadRequestException('bookingId is required');
    }

    try {
      return await this.hotelService.getHotelOrder(bookingId.trim());
    } catch (error: any) {
  
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (
        typeof error?.message === 'string' &&
        error.message.includes('not found')
      ) {
        throw new NotFoundException('Hotel order not found');
      }

      throw new InternalServerErrorException(
        'Failed to retrieve hotel information',
      );
    }
  }
}
