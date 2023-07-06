import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { UserWalletApiProvider } from "src/api/payments/user/user.service";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";
import { UserRepository } from "./user.repository";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        AuthService,
        AuthApiProvider,
        UserApiProvider,
        NotificationsApiProvider,
        EmailApiProvider,
        PrismaService,
        PaymentsApiProvider,
        UserWalletApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
