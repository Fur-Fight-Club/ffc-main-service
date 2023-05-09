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
import { MatchError } from "src/utils/error/match.error";
import { MatchController } from "./match.controller";
import { MatchRepository } from "./match.repository";
import { MatchService } from "./match.service";

@Module({
  imports: [ConfigModule, NotificationsModule, AuthModule],
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
    MatchError,
  ],
})
export class MatchModule {}
