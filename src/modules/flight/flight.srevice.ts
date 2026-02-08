import { Injectable } from '@nestjs/common';
import { FlightRepository } from './repository/flight.repository';
import { FlightMapper } from './mappers/flight.map';
import { FlightSearchQuery } from './dto/flight.query';
@Injectable()
export class FlightService {
  constructor(
    private readonly repo: FlightRepository,
    private readonly mapper: FlightMapper,
  ) {}

  async searchFlights(query: FlightSearchQuery) {
    const queryString = this.mapper.buildQueryString(query);

    const response = await this.repo.searchFlights(queryString);

    return this.mapper.mapFlights(response, query);
  }
}
