import { Module } from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { PushNotificationsController } from "./push-notifications.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/api/auth/auth.module";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { PushNotificationsApi } from "src/api/notifications/push-notifications/push-notifications.schema";
import { PushNotificationsApiProvider } from "src/api/notifications/push-notifications/push-notifications.service";

@Module({
  imports: [ConfigModule, AuthModule, NotificationsModule],
  controllers: [PushNotificationsController],
  providers: [
    PushNotificationsService,
    AuthService,
    AuthApiProvider,
    NotificationsApiProvider,
    PushNotificationsApiProvider,
  ],
})
export class PushNotificationsModule {}
