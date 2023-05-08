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

@Module({
  imports: [ConfigModule, AuthModule, PaymentsModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    AuthService,
    AuthApiProvider,
    PaymentsApiProvider,
    WalletApiProvider,
  ],
})
export class WalletModule {}
