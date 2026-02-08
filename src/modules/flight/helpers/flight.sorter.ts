import { AbstractSorter } from 'src/helpers/common/sorter.builder';
import { FlightSearchQuery } from '../dto/flight.query';
import { FlightLegView } from '../types/flight.types';

export class FlightLegSorter extends AbstractSorter<FlightLegView, FlightSearchQuery> {
  sort(items: FlightLegView[], query: FlightSearchQuery): FlightLegView[] {
    const sortBy = query.sortBy;
    let sortOrder = query.sortOrder;

    const allowed = new Set(['departureTime', 'arrivalTime', 'duration', 'price']);
    if (!sortBy || !allowed.has(sortBy)) return items;

    if (!sortOrder || (sortOrder !== 'asc' && sortOrder !== 'desc')) sortOrder = 'asc';
    const factor = sortOrder === 'asc' ? 1 : -1;

    return [...items].sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';

      if (sortBy === 'duration') {
        aValue = parseDurationToMinutes(a.duration);
        bValue = parseDurationToMinutes(b.duration);
      } else if (sortBy === 'departureTime') {
        aValue = a.departureTime;
        bValue = b.departureTime;
      } else if (sortBy === 'arrivalTime') {
        aValue = a.arrivalTime || '';
        bValue = b.arrivalTime || '';
      } else if (sortBy === 'price') {
        aValue =
          a.price?.total != null ? parseFloat(a.price.total.toString()) : Number.MAX_VALUE;
        bValue =
          b.price?.total != null ? parseFloat(b.price.total.toString()) : Number.MAX_VALUE;
      }

      if (aValue < bValue) return -1 * factor;
      if (aValue > bValue) return 1 * factor;
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

