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

describe("CreditsService", () => {
  let service: CreditsService;

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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
