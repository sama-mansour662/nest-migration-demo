import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.srevice';
import { FlightSearchQuery } from './dto/flight.query';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({ path: 'flight', version: '1' })
@UseGuards(JwtAuthGuard)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('flight-search')
  searchFlights(@Body() query: FlightSearchQuery) {
    return this.flightService.searchFlights(query);
  }
}
