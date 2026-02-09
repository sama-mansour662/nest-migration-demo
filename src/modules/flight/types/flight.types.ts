export type FlightLegView = {
  id: string;
  duration: string;
  flightCode: string;
  departure: string;
  arrival: string;
  departureTime: string;
  departureDateOnly: string;
  arrivalTime: string;
  arrivalDateOnly: string;
  stopCount?: number;
  segmentId?: string[];
  price: {
    total: string | number | null;
    currency: string | null;
    luggage?: string | number | null;
    tax?: string | number | null;
    base?: string | number | null;
    penalty?: string | number | null;
    oldTotal?: string | number | null;
    refundable?: boolean | null;
  } | null;
  hasPrice: boolean;
  fareFamily: string | string[] | null;
  fareFamilies: string[];
  classOfLeg: string[];
};

