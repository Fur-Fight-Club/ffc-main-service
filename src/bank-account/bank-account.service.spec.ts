import { Test, TestingModule } from "@nestjs/testing";
import { BankAccountService } from "./bank-account.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { BankAccountApiProvider } from "src/api/payments/bank-account/bank-account.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";

describe("BankAccountService", () => {
  let service: BankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountService,
        AuthService,
        AuthApiProvider,
        PaymentsApiProvider,
        BankAccountApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<BankAccountService>(BankAccountService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
