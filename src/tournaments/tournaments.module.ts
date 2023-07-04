import { Module } from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import { TournamentsController } from "./tournaments.controller";
import { PrismaService } from "src/services/prisma.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MatchService } from "src/match/match.service";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { AuthModule } from "src/auth/auth.module";
import { PaymentsModule } from "src/api/payments/payments.module";
import { WalletModule } from "src/wallet/wallet.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { MatchMessageApiProvider } from "src/api/notifications/match-message/match-message.service";
import { MatchRepository } from "src/match/match.repository";
import { MonsterRepository } from "src/monster/monster.repository";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { WalletApiProvider } from "src/api/payments/wallet/wallet.service";
import { MatchGateway } from "src/match/match.gateway";

@Module({
  imports: [
    ConfigModule,
    NotificationsModule,
    AuthModule,
    PaymentsModule,
    WalletModule,
  ],
  controllers: [TournamentsController],
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
  ],
})
export class TournamentsModule {}
