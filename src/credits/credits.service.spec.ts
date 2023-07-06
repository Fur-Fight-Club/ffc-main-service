import { Test, TestingModule } from "@nestjs/testing";
import { CreditsService } from "./credits.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { CreditsApiProvider } from "src/api/payments/credits/credits.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { UserApi } from "src/api/auth/user/user.schema";
import { EmailApi } from "src/api/notifications/mails/mails.schema";
import { CreditsApi } from "src/api/payments/credits/credits.interface";
import {
  TransactionTag,
  TransactionType,
} from "ffc-prisma-package/dist/client";

describe("CreditsService", () => {
  let service: CreditsService;
  let creditsApi: CreditsApi;
  let usersApi: UserApi;
  let emailApi: EmailApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditsService,
        AuthService,
        AuthApiProvider,
        NotificationsApiProvider,
        EmailApiProvider,
        PaymentsApiProvider,
        CreditsApiProvider,
        JwtService,
        ConfigService,
        UserApiProvider,
      ],
    }).compile();

    service = module.get<CreditsService>(CreditsService);
    creditsApi = module.get<CreditsApi>(CreditsApi);
    usersApi = module.get<UserApi>(UserApi);
    emailApi = module.get<EmailApi>(EmailApi);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("buyCredits", () => {
    it("should buy credits for the specified user and send an invoice email", async () => {
      const credits = "10";
      const userId = 1;
      const requestFrom = "web";

      const buyCreditResponse = {
        transaction: {
          amount: 1000,
          createdAt: new Date(),
          id: 1,
          invoiceId: 1,
          matchId: null,
          monsterId: null,
          tag: TransactionTag.BUY_CREDIT,
          type: TransactionType.IN,
          walletId: 1,
        },
        invoice: {
          uuid: "123",
          url: "http://example.com/invoice",
          createdAt: new Date(),
          id: 1,
          amount: 1000,
          fk_user: 1,
        },
        payment_url: "http://example.com/payment",
      };
      const userResponse = { email: "test@example.com", firstname: "John" };

      jest
        .spyOn(creditsApi, "buyCredits")
        .mockResolvedValueOnce(buyCreditResponse);
      jest.spyOn(usersApi, "getById").mockResolvedValueOnce(userResponse);
      jest.spyOn(emailApi, "sendInvoiceEmail").mockResolvedValueOnce(true);

      const result = await service.buyCredits(credits, userId, requestFrom);

      expect(creditsApi.buyCredits).toHaveBeenCalledWith(
        userId,
        credits,
        requestFrom
      );
      expect(usersApi.getById).toHaveBeenCalledWith(userId);
      expect(emailApi.sendInvoiceEmail).toHaveBeenCalledWith(
        userResponse.email,
        userResponse.firstname,
        10,
        buyCreditResponse.invoice.uuid,
        buyCreditResponse.invoice.url
      );
      expect(result).toEqual(buyCreditResponse);
    });
  });
});
