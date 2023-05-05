import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { AuthModule } from "src/api/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { NotificationsModule } from "src/api/notifications/notifications.module";

@Module({
  imports: [ConfigModule, AuthModule, NotificationsModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    AuthService,
    AuthApiProvider,
    UserApiProvider,
    PrismaService,
    NotificationsApiProvider,
    EmailApiProvider,
  ],
})
export class AccountModule {}
