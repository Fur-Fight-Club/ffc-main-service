import { Module } from "@nestjs/common";
import { BankAccountService } from "./bank-account.service";
import { BankAccountController } from "./bank-account.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/api/auth/auth.module";
import { PaymentsModule } from "src/api/payments/payments.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { BankAccountApiProvider } from "src/api/payments/bank-account/bank-account.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";

@Module({
  imports: [ConfigModule, AuthModule, PaymentsModule],
  controllers: [BankAccountController],
  providers: [
    BankAccountService,
    AuthService,
    AuthApiProvider,
    PaymentsApiProvider,
    BankAccountApiProvider,
  ],
})
export class BankAccountModule {}
