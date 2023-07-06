import { Test, TestingModule } from "@nestjs/testing";
import { TournamentsService } from "./tournaments.service";
import { ConfigService } from "@nestjs/config";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { MatchMessageApiProvider } from "src/api/notifications/match-message/match-message.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { WalletApiProvider } from "src/api/payments/wallet/wallet.service";
import { AuthService } from "src/auth/auth.service";
import { MatchGateway } from "src/match/match.gateway";
import { MatchRepository } from "src/match/match.repository";
import { MatchService } from "src/match/match.service";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("TournamentsService", () => {
  let service: TournamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentsService,
        ConfigService,
        PrismaService,
        MatchService,
        AuthService,
        AuthApiProvider,
        NotificationsApiProvider,
        MatchMessageApiProvider,
        MatchRepository,
        MonsterRepository,
        PaymentsApiProvider,
        WalletApiProvider,
        MatchGateway,
        JwtService,
      ],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
