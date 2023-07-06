import { Test, TestingModule } from "@nestjs/testing";
import { PaymentsService } from "./payments.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { PaymentApiProvider } from "src/api/payments/payment/payment.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("PaymentsService", () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        AuthService,
        AuthApiProvider,
        PaymentsApiProvider,
        PaymentApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
