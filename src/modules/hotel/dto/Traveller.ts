export interface Traveller {
  id: string;
  title: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  nationality: string | null;
  gender: string | null;
  birthDate: string | null;
  ticketType?: string | null;
  originalTicketNo?: string | null;
  smokingPreference?: string | null;
}
