import { Module } from "@nestjs/common";
import { NotificationsApiProvider } from "./notifications.service";
import { AuthService } from "src/auth/auth.service";
import { EmailApiProvider } from "./mails/mails.service";
import { EmailApi } from "./mails/mails.schema";

@Module({
  providers: [NotificationsApiProvider, EmailApiProvider, AuthService],
  exports: [EmailApi],
})
export class NotificationsModule {}
