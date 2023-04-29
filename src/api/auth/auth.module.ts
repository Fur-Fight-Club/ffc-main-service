import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "./auth.service";
import { UserApi } from "./user/user.interface";
import { UserApiProvider } from "./user/user.service";

@Module({
  providers: [AuthApiProvider, UserApiProvider, AuthService],
  exports: [UserApi],
})
export class AuthModule {}
