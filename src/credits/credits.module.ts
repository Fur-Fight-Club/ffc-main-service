import { Module } from "@nestjs/common";
import { CreditsService } from "./credits.service";
import { CreditsController } from "./credits.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/api/auth/auth.module";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { PaymentsModule } from "src/api/payments/payments.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { CreditsApiProvider } from "src/api/payments/credits/credits.service";

@Module({
  imports: [ConfigModule, AuthModule, NotificationsModule, PaymentsModule],
  controllers: [CreditsController],
  providers: [
    CreditsService,
    AuthService,
    AuthApiProvider,
    NotificationsApiProvider,
    EmailApiProvider,
    PaymentsApiProvider,
    CreditsApiProvider,
  ],
})
export class CreditsModule {}
