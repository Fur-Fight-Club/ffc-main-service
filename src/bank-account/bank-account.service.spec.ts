import { Test, TestingModule } from "@nestjs/testing";
import { BankAccountService } from "./bank-account.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { BankAccountApiProvider } from "src/api/payments/bank-account/bank-account.service";
import { PaymentsApiProvider } from "src/api/payments/payments.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { BankAccountApi } from "src/api/payments/bank-account/bank-account.schema";
import { StripeBankAccount } from "ffc-prisma-package/dist/client";

const stripeBankAccount = {
  id: 1,
  bank_account_id: "bank_account_id",
  country: "FR",
  fk_stripe_account: 1,
  fringerprint: "ba_fingerprint",
  last4: "1234",
} as StripeBankAccount;

describe("BankAccountService", () => {
  let service: BankAccountService;
  let bankAccountApi: BankAccountApi;

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
    bankAccountApi = module.get<BankAccountApi>(BankAccountApi);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("addBankAccount", () => {
    it("should add a bank account for the specified user", async () => {
      const createBankAccountDto = { iban: "FR1234567890" };
      const userId = 1;

      jest
        .spyOn(bankAccountApi, "addBankAccount")
        .mockResolvedValueOnce(stripeBankAccount);

      const result = await service.addBankAccount(createBankAccountDto, userId);

      expect(bankAccountApi.addBankAccount).toHaveBeenCalledWith(
        userId,
        createBankAccountDto.iban
      );
      expect(result).toEqual(stripeBankAccount);
    });
  });

  describe("getBankAccount", () => {
    it("should retrieve the bank account of the specified user", async () => {
      const userId = 1;

      jest
        .spyOn(bankAccountApi, "getBankAccount")
        .mockResolvedValueOnce(stripeBankAccount);

      const result = await service.getBankAccount(userId);

      expect(bankAccountApi.getBankAccount).toHaveBeenCalledWith(userId);
      expect(result).toEqual(stripeBankAccount);
    });
  });

  describe("deleteBankAccount", () => {
    it("should delete the bank account of the specified user", async () => {
      const userId = 1;

      jest
        .spyOn(bankAccountApi, "deleteBankAccount")
        .mockResolvedValueOnce(stripeBankAccount);

      const result = await service.deleteBankAccount(userId);

      expect(bankAccountApi.deleteBankAccount).toHaveBeenCalledWith(userId);
      expect(result).toEqual(stripeBankAccount);
    });
  });
});
