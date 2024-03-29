import {
  Inject,
  Injectable,
  Provider,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  BuyCreditHeaders,
  BuyCreditReturn,
  CreditsApi,
} from "./credits.interface";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { PaymentsApi } from "../payments.interface";

@Injectable()
class CreditsApiImpl implements CreditsApi {
  constructor(@Inject(PaymentsApi) private paymentsApi: PaymentsApi) {}
  async buyCredits(
    user: number,
    amount: string,
    requestFrom: BuyCreditHeaders["x-request-from"]
  ): Promise<BuyCreditReturn> {
    const response = await handleApiResponse<BuyCreditReturn>(
      await this.paymentsApi.fetch("credits/buy", {
        method: "POST",
        body: JSON.stringify({
          user,
          credits: amount,
          requestFrom,
        }),
      })
    );

    checkApiResponse(response, {
      400: (response) => new UnprocessableEntityException(response),
    });

    return response;
  }
}

export const CreditsApiProvider: Provider = {
  provide: CreditsApi,
  useClass: CreditsApiImpl,
};
