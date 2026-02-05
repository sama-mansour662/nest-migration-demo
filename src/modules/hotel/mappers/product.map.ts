import { HotelProduct } from '../dto/HotelProduct';

export class HotelProductMapper {
  static map(hotelProduct: any): HotelProduct {
    const options = hotelProduct.options ?? {};
    const additionalData = hotelProduct.additionalData ?? {};

    return {
      id: hotelProduct.id,
      name: hotelProduct.name,

      status: hotelProduct.status,
      paymentStatus: hotelProduct.paymentStatus,
      vendorStatus: hotelProduct.vendorStatus,
      supplierStatus: hotelProduct.supplierStatus,

      isManual: hotelProduct.isManual,

      confirmationNumber: hotelProduct.confirmationNumber,
      vendorConfirmationNumber: hotelProduct.vendorConfirmationNumber,
      supplierConfirmationNumber: hotelProduct.supplierConfirmationNumber,
      supplierOrderReferenceId: hotelProduct.supplierOrderReferenceId,

      supplierName: hotelProduct.supplierName,
      vendorName: hotelProduct.vendorName,
      connectivitySupplierType: options.connectivitySupplierType,

      hotelId: options.hotelId,
      hotelNameEn: options.hotelNameEn,
      hotelNameAr: options.hotelNameAr,

      addressEn: options.addressEn,
      addressAr: options.addressAr,

      cityEn: options.cityEn,
      cityAr: options.cityAr,
      countryCode: options.countryCode,

      geoLocation: options.geoLocation ?? null,
      starRating: options.starRating ?? null,

      chain: {
        id: options.chainCode,
        nameEn: options.chainNameEn,
      },

      brand: {
        id: options.brandId,
        nameEn: options.brandNameEn,
      },

      checkIn: options.checkIn,
      checkOut: options.checkOut,
      numberOfNights: options.numberOfNights,
      numberOfGuests: options.numberOfGuests,

      roomSummary: {
        roomName: options.roomName,
        roomBasis: options.roomBasis,
        roomType: options.roomType,
        roomClass: options.roomClass,
        numberOfRooms: options.numberOfRooms,
      },

      tourismFee: options.tourismFee ?? null,
      hotelHasTransfer: options.hotelHasTransfer ?? false,
      isFullyMarkedPaid: options.isFullyMarkedPaid ?? false,

      defaultImage: hotelProduct.defaultImage ?? null,

      price: hotelProduct.price,
      vendorPrice: hotelProduct.vendorPrice,
      supplierPrice: hotelProduct.supplierPrice,
      netPrice: additionalData?.netPrice ?? null,
      displayPrice: hotelProduct.displayPrice,

      exchangeRates: additionalData?.exchange ?? null,

      cancellation: {
        isRefundable:
          additionalData?.cancellationPolicies?.hasFreeCancellation ?? null,
        firstCancellationDate: options.firstCancellationDate ?? null,
        supplierFirstCancellationDate:
          options.supplierFirstCancellationDate ?? null,
        policies: additionalData?.cancellationPolicies ?? [],
      },

      searchUuids: {
        searchUuid: additionalData?.searchAttributes?.searchUuid,
        availUuid: additionalData?.availUuid,
        sessionId: options.sessionId,
      },

      orderedAt: hotelProduct.orderedAt,
      confirmedAt: hotelProduct.confirmedAt,
      statusHistory: hotelProduct.statusHistory,

      rawAdditionalData: additionalData,
    };
  }
}
