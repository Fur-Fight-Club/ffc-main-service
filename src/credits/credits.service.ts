import { Inject, Injectable } from "@nestjs/common";
import { UserApi } from "src/api/auth/user/user.schema";
import { EmailApi } from "src/api/notifications/mails/mails.interface";
import {
  BuyCreditReturn,
  CreditsApi,
} from "src/api/payments/credits/credits.interface";

@Injectable()
export class CreditsService {
  constructor(
    @Inject(EmailApi) private readonly emailApi: EmailApi,
    @Inject(CreditsApi) private readonly creditsApi: CreditsApi,
    @Inject(UserApi) private readonly usersApi: UserApi
  ) {}

  async buyCredits(credits: string, userId: number): Promise<BuyCreditReturn> {
    console.log(typeof credits, credits);

    const buyCreditResponse = await this.creditsApi.buyCredits(userId, credits);

    const userResponse = await this.usersApi.getById(userId);

    await this.emailApi.sendInvoiceEmail(
      userResponse.email,
      userResponse.firstname,
      Number((buyCreditResponse.transaction.amount / 100).toFixed(2)),
      buyCreditResponse.invoice.uuid,
      buyCreditResponse.invoice.url
    );
    return buyCreditResponse;
  }
}
