import { HotelProduct } from './HotelProduct';
import { Traveller } from './Traveller';

export interface HotelInfoResponse {
  addOns?: any;
  id?: string;
  _id?: string;
  _orderId?: string;

  orderId: string;
  orderNumber: string;

  customerId?: string;
  cartId?: string;
  saleId?: string;

  type: 'hotel';

  status?: string;
  paymentStatus?: string;

  statusMessage?: string;
  paymentStatusMessage?: string;
  displayStatus?: string;

  state?: string;

  createdAt: string;
  updatedAt: string;
  paidAt?: string;

  trackId: string;
  storeId: string;
  groupId: string;

  currency: string;
  displayCurrency?: string;
  displayCurrencyRate?: number;

  contact: any;
  customerEmail: string;

  emails?: any;

  payment?: any;

  invoicePublicUrl?: string;
  invoicePublicXmlUrl?: string;

  allowedPaymentMethods: any;
  displayItems: any;

  products?: any[];

  product: HotelProduct;
  travellers: Traveller[];

  totals: any;
  grandTotals?: any;
  displayTotals?: any;

  options?: {
    isMultiProduct?: boolean;
    mainProductCount?: number;
  };

  isManual?: boolean;
  isManualOrder?: boolean;

  expiredAt?: string | null;

  notes: any[];

  additionalData: any;
}
