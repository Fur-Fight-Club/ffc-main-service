import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Provider,
} from "@nestjs/common";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { PaymentsApi } from "../payments.interface";
import {
  TransferMoneyReturn,
  WalletApi,
  WalletBalanceResponse,
  WalletBalanceResponseWithUser,
} from "./wallet.schema";

@Injectable()
class WalletApiImpl implements WalletApi {
  constructor(@Inject(PaymentsApi) private paymentsApi: PaymentsApi) {}
  async transferMoney(
    userId: number,
    amount: number
  ): Promise<TransferMoneyReturn> {
    const result = await handleApiResponse<TransferMoneyReturn>(
      await this.paymentsApi.fetch(`wallet/user/${userId}/withdraw`, {
        method: "POST",
        body: JSON.stringify({
          amount,
        }),
      })
    );

    checkApiResponse(result, {
      404: (response) => new NotFoundException(response.message),
      400: (response) => new BadRequestException(response.message),
    });

    return result;
  }

  async getBalance(userId: number): Promise<WalletBalanceResponse> {
    const result = await handleApiResponse<WalletBalanceResponse>(
      await this.paymentsApi.fetch(`wallet/user/${userId}/balance`)
    );

    checkApiResponse(result, {
      404: (response) => new NotFoundException(response.message),
    });

    return result;
  }

  async getAllWallets(): Promise<WalletBalanceResponseWithUser[]> {
    const result = await handleApiResponse<WalletBalanceResponseWithUser[]>(
      await this.paymentsApi.fetch(`wallet/users`)
    );

    checkApiResponse(result);

    return result;
  }

  async updateUsersWalletBalance(
    userId: number,
    amount: number
  ): Promise<WalletBalanceResponse> {
    const result = await handleApiResponse<WalletBalanceResponse>(
      await this.paymentsApi.fetch(`wallet/user/${userId}/balance`, {
        method: "PATCH",
        body: JSON.stringify({
          amount,
        }),
      })
    );

    checkApiResponse(result, {
      404: (response) => new NotFoundException(response.message),
    });

    return result;
  }
}

export const WalletApiProvider: Provider = {
  provide: WalletApi,
  useClass: WalletApiImpl,
};
