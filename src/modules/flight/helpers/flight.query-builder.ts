import { AbstractQueryBuilder } from 'src/helpers/common/query.builder';
import { FlightSearchQuery } from '../dto/flight.query';

export class FlightQueryBuilder extends AbstractQueryBuilder<FlightSearchQuery> {
  build(query: FlightSearchQuery): string {
    const params = {
      origin: query.origin,
      destination: query.destination ?? '',
      departureDate: query.departureDate,
      returnDate: query.returnDate ?? '',
      adults: query.adults,
      children: query.children,
      infants: query.infants,
      cabinClass: query.cabinClass,
    };

    let urlQuery = `${this.encode(params.origin)}-${this.encode(params.destination)}/`;

    for (const key of Object.keys(params)) {
      const typedKey = key as keyof typeof params;
      const value = params[typedKey];

      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === 0 ||
        value === '0' ||
        typedKey === 'origin' ||
        typedKey === 'destination'
      ) {
        continue;
      }

      if (typedKey === 'adults') urlQuery += `${this.encode(value)}Adult/`;
      else if (typedKey === 'children') urlQuery += `${this.encode(value)}Child/`;
      else if (typedKey === 'infants') urlQuery += `${this.encode(value)}Infant/`;
      else urlQuery += `${this.encode(value)}/`;
    }

    return urlQuery;
  }
}

