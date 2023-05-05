import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";
import { MatchController } from "./match.controller";
import { ConfigModule } from "@nestjs/config";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { MatchMessageApiProvider } from "src/api/notifications/match-message/match-message.service";
import { AuthModule } from "src/api/auth/auth.module";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { AuthService } from "src/auth/auth.service";

@Module({
  imports: [ConfigModule, NotificationsModule, AuthModule],
  controllers: [MatchController],
  providers: [
    MatchService,
    AuthService,
    AuthApiProvider,
    NotificationsApiProvider,
    MatchMessageApiProvider,
  ],
})
export class MatchModule {}
