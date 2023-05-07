import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Provider,
} from "@nestjs/common";
import {
  PaymentApi,
  PaymentCallbackResponse,
  StripeCallback,
} from "./payment.interface";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { PaymentsApi } from "../payments.interface";

@Injectable()
class PaymentApiImpl implements PaymentApi {
  constructor(@Inject(PaymentsApi) private paymentsApi: PaymentsApi) {}
  async paymentCallback(callback: string, session_id: string) {
    const response = handleApiResponse<PaymentCallbackResponse>(
      await this.paymentsApi.fetch(`payments/${callback}/${session_id}`, {
        method: "GET",
      })
    );

    checkApiResponse(response, {
      400: (response) => new BadRequestException(response),
      404: (response) => new NotFoundException(response),
    });

    return response;
  }
}

export const PaymentApiProvider: Provider = {
  provide: PaymentApi,
  useClass: PaymentApiImpl,
};
