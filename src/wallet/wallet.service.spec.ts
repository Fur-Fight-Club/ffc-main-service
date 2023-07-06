import { Test, TestingModule } from "@nestjs/testing";
import { WalletService } from "./wallet.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { WalletApiProvider } from "src/api/payments/wallet/wallet.service";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("WalletService", () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        AuthService,
        AuthApiProvider,
        PaymentsApiProvider,
        WalletApiProvider,
        NotificationsApiProvider,
        EmailApiProvider,
        PrismaService,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
