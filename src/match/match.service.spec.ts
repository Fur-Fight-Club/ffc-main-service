import { Test, TestingModule } from "@nestjs/testing";
import { MatchService } from "./match.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { MatchMessageApiProvider } from "src/api/notifications/match-message/match-message.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { WalletApiProvider } from "src/api/payments/wallet/wallet.service";
import { AuthService } from "src/auth/auth.service";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { MatchGateway } from "./match.gateway";
import { MatchRepository } from "./match.repository";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("MatchService", () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        AuthService,
        AuthApiProvider,
        NotificationsApiProvider,
        MatchMessageApiProvider,
        PrismaService,
        MatchRepository,
        MonsterRepository,
        PaymentsApiProvider,
        WalletApiProvider,
        MatchGateway,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
