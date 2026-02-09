import { AbstractFilters } from 'src/helpers/common/filter.builder';
import { FlightSearchQuery } from '../dto/flight.query';
import { FlightLegView } from '../types/flight.types';

export class FlightLegFilters extends AbstractFilters<FlightLegView, FlightSearchQuery> {
  apply(items: FlightLegView[], query: FlightSearchQuery): FlightLegView[] {
    let out = items;

    if (query.onlyFlightsWithPrice) out = out.filter((i) => i.hasPrice);

    const airline = query.airlineCode?.trim()?.toUpperCase();
    if (airline) {
      out = out.filter((i) => (i.flightCode ?? '').toUpperCase().split('-')[0] === airline);
    }

    if (query.stopCount !== null && query.stopCount !== undefined) {
      out = out.filter((i) => i.stopCount === query.stopCount);
    }

    const legClass = query.legClass?.trim();
    if (legClass) out = out.filter((i) => i.classOfLeg.includes(legClass));

    const fareFamily = query.fareFamily?.trim()?.toLowerCase();
    if (fareFamily) {
      out = out.filter((i) => i.fareFamilies.some((f) => f.toLowerCase() === fareFamily));
    }

    // Preserve original behavior: limit BEFORE sorting (based on provider order).
    return out.slice(0, Number(query.limit ?? 20));
  }
}