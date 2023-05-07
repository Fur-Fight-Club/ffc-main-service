import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { ConfigModule } from "@nestjs/config";
import { PaymentsModule as PaymentsApiModule } from "src/api/payments/payments.module";
import { AuthModule } from "src/api/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { PaymentApiProvider } from "src/api/payments/payment/payment.service";

@Module({
  imports: [ConfigModule, PaymentsApiModule, AuthModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    AuthService,
    AuthApiProvider,
    PaymentsApiProvider,
    PaymentApiProvider,
  ],
})
export class PaymentsModule {}
