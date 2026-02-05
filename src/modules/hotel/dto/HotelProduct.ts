/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export interface HotelProduct {
  id: string;
  name: string;

  status: string;
  paymentStatus: string;
  isManual: boolean;

  supplierName?: string;
  vendorName?: string;
  connectivitySupplierType?: string;

  vendorStatus?: string;
  supplierStatus?: string;

  confirmationNumber?: string;
  vendorConfirmationNumber?: string;
  supplierConfirmationNumber?: string;
  supplierOrderReferenceId?: string;

  hotelId?: number | string;
  hotelNameEn?: string;
  hotelNameAr?: string;

  addressEn?: string;
  addressAr?: string;

  cityEn?: string;
  cityAr?: string;
  countryCode?: string;

  hotelPhone?: string | null;

  geoLocation?: {
    Latitude: number;
    Longitude: number;
  } | null;

  starRating?: number | null;

  chain?: {
    id?: number | string;
    nameEn?: string;
  };

  brand?: {
    id?: number | string;
    nameEn?: string;
  };

  checkIn?: string;
  checkOut?: string;
  numberOfNights?: number;
  numberOfGuests?: number;

  roomSummary: {
    roomName?: string;
    roomBasis?: string;
    roomType?: string;
    roomClass?: string;
    numberOfRooms?: number;
  };

  tourismFee?: any;
  hotelHasTransfer?: boolean;
  isFullyMarkedPaid?: boolean;

  defaultImage?: any | null;

  cancellation: {
    isRefundable: boolean | null;
    firstCancellationDate: string | null;
    supplierFirstCancellationDate: string | null;
    policies: any[];
  };

  price: any;
  vendorPrice?: any;
  supplierPrice?: any;
  netPrice?: any;

  displayPrice: any;
  displayCurrency?: string;

  exchangeRates?: any;

  searchUuids?: {
    searchUuid?: string;
    availUuid?: string;
    sessionId?: string;
  };

  orderedAt?: string;
  confirmedAt?: string;

  statusHistory?: any[];

  rawAdditionalData?: any;
}
