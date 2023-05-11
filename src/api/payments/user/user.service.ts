import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Provider,
} from "@nestjs/common";
import { UserWalletApi } from "./user.interface";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { PaymentsApi } from "../payments.interface";

@Injectable()
class UserWalletApiImpl implements UserWalletApi {
  constructor(@Inject(PaymentsApi) private payementsApi: PaymentsApi) {}

  async getUser(userId: number) {
    const response = handleApiResponse(
      await this.payementsApi.fetch(`user/${userId}`, {
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

export const UserWalletApiProvider: Provider = {
  provide: UserWalletApi,
  useClass: UserWalletApiImpl,
};
