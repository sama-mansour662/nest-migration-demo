import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.srevice';
import { FlightRepository } from './repository/flight.repository';
import { FlightMapper } from './mappers/flight.map';

@Module({
  controllers: [FlightController],
  providers: [FlightService, FlightRepository, FlightMapper],
})
export class FlightModule {}
