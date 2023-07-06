import { Test, TestingModule } from "@nestjs/testing";
import { AccountService } from "./account.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("AccountService", () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        AuthService,
        AuthApiProvider,
        UserApiProvider,
        PrismaService,
        NotificationsApiProvider,
        EmailApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
