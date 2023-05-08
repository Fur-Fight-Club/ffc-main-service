import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/api/auth/auth.module";
import { PaymentsModule } from "src/api/payments/payments.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { WalletApiProvider } from "src/api/payments/wallet/wallet.service";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { PrismaService } from "src/services/prisma.service";

@Module({
  imports: [ConfigModule, AuthModule, PaymentsModule, NotificationsModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    AuthService,
    AuthApiProvider,
    PaymentsApiProvider,
    WalletApiProvider,
    NotificationsApiProvider,
    EmailApiProvider,
    PrismaService,
  ],
})
export class WalletModule {}
