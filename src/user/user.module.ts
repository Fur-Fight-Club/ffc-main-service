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

@Module({
  imports: [ConfigModule, AuthApiModule, NotificationsModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    AuthApiProvider,
    UserApiProvider,
    NotificationsApiProvider,
    EmailApiProvider,
  ],
})
export class UserModule {}
