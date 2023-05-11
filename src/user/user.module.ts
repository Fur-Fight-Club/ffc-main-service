import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule as AuthApiModule } from "src/api/auth/auth.module";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { NotificationsModule } from "src/api/notifications/notifications.module";
import { UserRepository } from "./user.repository";
import { PrismaService } from "src/services/prisma.service";
import { PaymentsModule } from "src/api/payments/payments.module";
import { PaymentApiProvider } from "src/api/payments/payment/payment.service";
import { UserWalletApiProvider } from "src/api/payments/user/user.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";

@Module({
  imports: [ConfigModule, AuthApiModule, NotificationsModule, PaymentsModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    AuthService,
    AuthApiProvider,
    UserApiProvider,
    NotificationsApiProvider,
    EmailApiProvider,
    PrismaService,
    PaymentsApiProvider,
    UserWalletApiProvider,
  ],
})
export class UserModule {}
