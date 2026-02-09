import { AbstractSorter } from 'src/helpers/common/sorter.builder';
import { FlightSearchQuery } from '../dto/flight.query';
import { FlightLegView } from '../types/flight.types';

export class FlightLegSorter extends AbstractSorter<FlightLegView, FlightSearchQuery> {
  sort(items: FlightLegView[], query: FlightSearchQuery): FlightLegView[] {
    const sortBy = query.sortBy;
    if (
      !sortBy ||
      (sortBy !== 'departureTime' &&
        sortBy !== 'arrivalTime' &&
        sortBy !== 'duration' &&
        sortBy !== 'price')
    ) {
      return items;
    }

    const factor = query.sortOrder === 'desc' ? -1 : 1;

    const valueOf = (x: FlightLegView): string | number => {
      switch (sortBy) {
        case 'duration':
          return parseDurationToMinutes(x.duration);
        case 'departureTime':
          return x.departureTime;
        case 'arrivalTime':
          return x.arrivalTime || '';
        case 'price':
          return x.price?.total != null
            ? parseFloat(x.price.total.toString())
            : Number.MAX_VALUE;
      }
    };

    return [...items].sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      if (av < bv) return -1 * factor;
      if (av > bv) return 1 * factor;
      return 0;
    });
  }
}

function parseDurationToMinutes(duration: string): number {
  let totalMinutes = 0;
  const hourMatch = duration?.match?.(/(\d+)h/);
  const minuteMatch = duration?.match?.(/(\d+)m/);

  if (hourMatch) totalMinutes += parseInt(hourMatch[1], 10) * 60;
  if (minuteMatch) totalMinutes += parseInt(minuteMatch[1], 10);

  return totalMinutes;
}

