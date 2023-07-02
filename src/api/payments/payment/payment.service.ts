import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Provider,
} from "@nestjs/common";
import { Transaction } from "ffc-prisma-package/dist/client";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { PaymentsApi } from "../payments.interface";
import { PaymentApi, PaymentCallbackResponse } from "./payment.interface";

@Injectable()
class PaymentApiImpl implements PaymentApi {
  constructor(@Inject(PaymentsApi) private paymentsApi: PaymentsApi) {}

  async paymentCallback(callback: string, session_id: string) {
    const response = await handleApiResponse<PaymentCallbackResponse>(
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

  async getAllPayements() {
    const response = await handleApiResponse<Transaction[]>(
      await this.paymentsApi.fetch(`payments/all`, {
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
