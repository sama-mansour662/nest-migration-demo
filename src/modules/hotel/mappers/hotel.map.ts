import { HotelInfoResponse } from '../dto/HotelInfo';
import { HotelProductMapper } from './product.map';
import { TravellerMapper } from './traveller.map';

export class HotelMapper {
  static resolveTotals(order: any) {
    return order.displayTotals ?? order.grandTotals ?? order.totals;
  }

  static mapOrder(omsOrder: any, hotelProduct: any): HotelInfoResponse {
    return {
      addOns: hotelProduct.addons,
      id: omsOrder.id ?? omsOrder.orderId ?? omsOrder._orderId,
      _id: omsOrder._id,
      _orderId: omsOrder._orderId,

      orderId: omsOrder.orderId,
      orderNumber: omsOrder.orderNumber,
      customerId: omsOrder.customerId,
      cartId: omsOrder.cartId ?? omsOrder.additionalData?.cartId,
      saleId: omsOrder.additionalData?.saleId,

      type: 'hotel',

      status: omsOrder.status,
      paymentStatus: omsOrder.paymentStatus,
      statusMessage: omsOrder.statusMessage,
      paymentStatusMessage: omsOrder.paymentStatusMessage,
      displayStatus: omsOrder.displayStatus,

      state: omsOrder.additionalData?.state,

      createdAt: omsOrder.createdAt,
      updatedAt: omsOrder.updatedAt,
      paidAt: omsOrder.paidAt,

      trackId: omsOrder.trackId,
      storeId: omsOrder.storeId,
      groupId: omsOrder.groupId,

      currency: omsOrder.currency,
      displayCurrency: omsOrder.displayCurrency,
      displayCurrencyRate: omsOrder.displayCurrencyRate,

      contact: omsOrder.contact,
      customerEmail: omsOrder.customerEmail,
      emails: omsOrder.emails,

      payment: {
        ...omsOrder.payment,
        installmentCount:
          omsOrder.payment?.instalmentCount ??
          omsOrder.payment?.installmentCount ??
          null,
      },

      invoicePublicUrl: omsOrder.additionalData?.invoicePublicUrl,
      invoicePublicXmlUrl: omsOrder.additionalData?.invoicePublicXmlUrl,

      allowedPaymentMethods: omsOrder.allowedPaymentMethods,
      displayItems: omsOrder.displayItems,

      products: omsOrder.products ?? [],

      product: HotelProductMapper.map(hotelProduct),
      travellers: [],

      totals: this.resolveTotals(omsOrder),
      grandTotals: omsOrder.grandTotals ?? null,
      displayTotals: omsOrder.displayTotals,

      options: omsOrder.options ?? {
        isMultiProduct: false,
        mainProductCount: 1,
      },

      isManual: omsOrder.isManual,
      isManualOrder: omsOrder.isManualOrder,

      expiredAt: omsOrder.expiredAt ?? null,
      notes: omsOrder.notes ?? [],
      additionalData: omsOrder.additionalData ?? {},
    };
  }
}
