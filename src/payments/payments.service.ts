import { Inject, Injectable } from "@nestjs/common";
import { PaymentApi } from "src/api/payments/payment/payment.interface";

@Injectable()
export class PaymentsService {
  constructor(@Inject(PaymentApi) private readonly paymentApi: PaymentApi) {}
  paymentCallback(callback: string, session_id: string) {
    return this.paymentApi.paymentCallback(callback, session_id);
  }
}
