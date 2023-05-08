import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Provider,
} from "@nestjs/common";
import { BankAccountApi } from "./bank-account.schema";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { PaymentsApi } from "../payments.interface";
import { StripeBankAccount } from "ffc-prisma-package/dist/client";

@Injectable()
class BankAccountApiImpl implements BankAccountApi {
  constructor(@Inject(PaymentsApi) private paymentsApi: PaymentsApi) {}
  async addBankAccount(
    userId: number,
    iban: string
  ): Promise<StripeBankAccount> {
    const result = await handleApiResponse<StripeBankAccount>(
      await this.paymentsApi.fetch("bank-account", {
        method: "POST",
        body: JSON.stringify({
          userId,
          iban,
        }),
      })
    );

    checkApiResponse(result, {
      400: (response) => new BadRequestException(response.message),
    });

    return result;
  }

  async getBankAccount(userId: number): Promise<StripeBankAccount> {
    const result = await handleApiResponse<StripeBankAccount>(
      await this.paymentsApi.fetch(`bank-account/${userId}`, {
        method: "GET",
      })
    );

    checkApiResponse(result, {
      404: (response) => new NotFoundException(response.message),
    });

    return result;
  }

  async deleteBankAccount(userId: number): Promise<StripeBankAccount> {
    const result = await handleApiResponse<StripeBankAccount>(
      await this.paymentsApi.fetch(`bank-account/${userId}`, {
        method: "DELETE",
      })
    );

    checkApiResponse(result, {
      400: (response) => new BadRequestException(response.message),
    });

    return result;
  }
}

export const BankAccountApiProvider: Provider = {
  provide: BankAccountApi,
  useClass: BankAccountApiImpl,
};
