import { AbstractFilters } from 'src/helpers/common/filter.builder';
import { FlightSearchQuery } from '../dto/flight.query';
import { FlightLegView } from '../types/flight.types';

export class FlightLegFilters extends AbstractFilters<FlightLegView, FlightSearchQuery> {
  apply(items: FlightLegView[], query: FlightSearchQuery): FlightLegView[] {
    let out = items;

    if (query.onlyFlightsWithPrice) out = out.filter((i) => i.hasPrice);

    if (query.airlineCode?.trim()) {
      const airline = query.airlineCode.trim().toUpperCase();
      out = out.filter(
        (i) => (i.flightCode ?? '').toUpperCase().split('-')[0] === airline,
      );
    }

    if (query.stopCount !== null && query.stopCount !== undefined) {
      out = out.filter((i) => i.stopCount === query.stopCount);
    }

    if (query.legClass?.trim()) {
      const desired = query.legClass.trim();
      out = out.filter((i) => i.classOfLeg.includes(desired));
    }

    if (query.fareFamily?.trim()) {
      const desired = query.fareFamily.trim().toLowerCase();
      out = out.filter((i) =>
        i.fareFamilies.some((f) => f.toLowerCase() === desired),
      );
    }

    // Preserve original behavior: limit BEFORE sorting (based on provider order).
    const limit = query.limit ?? 20;
    return out.slice(0, Number(limit));
  }
}

