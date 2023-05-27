import { Module } from "@nestjs/common";
import { NotificationsApiProvider } from "./notifications.service";
import { AuthService } from "src/auth/auth.service";
import { EmailApiProvider } from "./mails/mails.service";
import { EmailApi } from "./mails/mails.schema";
import { PushNotificationsApiProvider } from "./push-notifications/push-notifications.service";
import { NotificationsApi } from "./notifications.interface";

@Module({
  providers: [
    NotificationsApiProvider,
    EmailApiProvider,
    AuthService,
    PushNotificationsApiProvider,
  ],
  exports: [EmailApi, NotificationsApi],
})
export class NotificationsModule {}
