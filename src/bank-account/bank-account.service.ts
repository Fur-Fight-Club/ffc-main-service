import { Inject, Injectable } from "@nestjs/common";
import {
  BankAccountApi,
  CreateBankAccountDto,
} from "src/api/payments/bank-account/bank-account.schema";

@Injectable()
export class BankAccountService {
  constructor(
    @Inject(BankAccountApi) private readonly bankAccountApi: BankAccountApi
  ) {}
  addBankAccount(createBankAccountDto: CreateBankAccountDto, userId: number) {
    return this.bankAccountApi.addBankAccount(
      userId,
      createBankAccountDto.iban
    );
  }
  getBankAccount(userId: number) {
    return this.bankAccountApi.getBankAccount(userId);
  }
  deleteBankAccount(userId: number) {
    return this.bankAccountApi.deleteBankAccount(userId);
  }
}
