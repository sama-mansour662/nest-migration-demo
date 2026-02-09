import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FlightService } from './flight.srevice';
import { FlightSearchQuery } from './dto/flight.query';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FlightSearchDocs } from './docs';

@ApiTags('Flight')
@ApiBearerAuth('bearer')
@Controller({ path: 'flight', version: '1' })
@UseGuards(JwtAuthGuard)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('flight-search')
  @FlightSearchDocs()

  searchFlights(@Query() query: FlightSearchQuery) {
    return this.flightService.searchFlights(query);
  }
}
