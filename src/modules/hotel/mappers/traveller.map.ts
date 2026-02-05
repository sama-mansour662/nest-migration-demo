import { Traveller } from '../dto/Traveller';

export class TravellerMapper {
  static map(traveller: any): Traveller {
    return {
      id: traveller.id,
      title: traveller.title ?? null,
      firstName: traveller.firstName,
      middleName: traveller.middleName ?? null,
      lastName: traveller.lastName,
      nationality: traveller.nationality ?? null,
      gender: traveller.gender ?? null,
      birthDate: traveller.birthDate ?? null,
      ticketType: traveller.ticketType ?? null,
      originalTicketNo: traveller.originalTicketNo ?? null,
      smokingPreference: traveller.additionalData?.smokingPreference ?? null,
    };
  }

  static mapList(hotelProduct: any): Traveller[] {
    return hotelProduct.traveller?.map((t: any) => this.map(t)) ?? [];
  }
}
