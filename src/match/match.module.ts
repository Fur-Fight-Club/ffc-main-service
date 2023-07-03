import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/api/auth/auth.module";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { MatchMessageApiProvider } from "src/api/notifications/match-message/match-message.service";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { AuthService } from "src/auth/auth.service";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { MatchController } from "./match.controller";
import { MatchRepository } from "./match.repository";
import { MatchService } from "./match.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { WalletApiProvider } from "src/api/payments/wallet/wallet.service";
import { WalletModule } from "src/wallet/wallet.module";
import { PaymentsModule } from "src/api/payments/payments.module";
import { MatchGateway } from "./match.gateway";

@Module({
  imports: [
    ConfigModule,
    NotificationsModule,
    AuthModule,
    PaymentsModule,
    WalletModule,
  ],
  controllers: [MatchController],
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
  ],
})
export class MatchModule {}
