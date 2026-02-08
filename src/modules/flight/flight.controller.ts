import { Controller, Get, Query } from '@nestjs/common';
import { FlightService } from './flight.srevice';
import { FlightSearchQuery } from './dto/flight.query';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller({ path: 'flight', version: '1' })
@UseGuards(JwtAuthGuard)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('search')
  searchFlights(@Query() query: FlightSearchQuery) {
    return this.flightService.searchFlights(query);
  }
}
