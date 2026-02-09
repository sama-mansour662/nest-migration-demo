import { FlightLegView } from '../types/flight.types';

export function buildFlightLegViews(response: any): FlightLegView[] {
  const itineraries: any[] = response?.itinerary ?? [];
  const legs: any[] = response?.leg ?? [];
  const segments: any[] = response?.segment ?? [];

  if (!itineraries.length || !legs.length) return [];

  const legsById = indexById(legs, (l) => l?.id);
  const segmentsById = indexById(segments, (s) => s?.id);

  const out: FlightLegView[] = [];

  for (const itinerary of itineraries) {
    const leg = legsById[itinerary?.legId];
    if (!leg) continue;

    const segmentIds: string[] = Array.isArray(leg.segmentId) ? leg.segmentId : [];

    const fareFamilies = segmentIds
      .map((id) => segmentsById[id]?.fareFamily)
      .filter((v): v is string => typeof v === 'string' && v.trim() !== '');

    const distinctFareFamilies = uniq(fareFamilies);
    const fareFamily: string | string[] | null =
      distinctFareFamilies.length === 0 ? null : distinctFareFamilies.length === 1 ? distinctFareFamilies[0] : distinctFareFamilies;

    const classOfLeg = extractClassOfLeg(itinerary?.fare);

    const price = itinerary?.price?.totals ?? null;
    const hasPrice = !!(
      itinerary?.price && Object.keys(itinerary.price).length > 0
    );

    const departureIso = new Date(leg.departure).toISOString();
    const arrivalIso = new Date(leg.arrival).toISOString();

    out.push({
      id: leg.id,
      duration: leg.duration?.text ?? leg.duration,
      flightCode: leg.flightCode,
      departure: leg.departure,
      arrival: leg.arrival,
      departureTime: departureIso.split('T')[1].split('.')[0],
      departureDateOnly: departureIso.split('T')[0],
      arrivalTime: arrivalIso.split('T')[1].split('.')[0],
      arrivalDateOnly: arrivalIso.split('T')[0],
      stopCount: leg.stopCount,
      segmentId: segmentIds,
      price,
      hasPrice,
      fareFamily,
      fareFamilies: distinctFareFamilies,
      classOfLeg,
    });
  }

  return out;
}

function uniq(arr: string[]): string[] {
  return [...new Set(arr)];
}

function indexById<T>(
  arr: T[],
  idFn: (item: T) => string | undefined,
): Record<string, T> {
  const out: Record<string, T> = {};
  for (const item of arr ?? []) {
    const id = idFn(item);
    if (id) out[id] = item;
  }
  return out;
}

function extractClassOfLeg(fare: any): string[] {
  const classes: string[] = [];
  const legDetails = fare?.legDetails;
  if (!Array.isArray(legDetails) || legDetails.length === 0) return classes;

  for (const legDetail of legDetails) {
    const segments = legDetail?.segment;
    if (!Array.isArray(segments) || segments.length === 0) continue;

    for (const segment of segments) {
      const v = segment?.classOfLeg;
      if (typeof v === 'string' && v.trim() !== '' && !classes.includes(v)) {
        classes.push(v);
      }
    }
  }

  return classes;
}

