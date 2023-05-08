import { ApiProperty } from "@nestjs/swagger";
import {
  Invoice,
  StripeBankAccount,
  Transaction,
} from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface WalletApi {
  transferMoney(userId: number, amount: number): Promise<TransferMoneyReturn>;
  getBalance(userId: number): Promise<WalletBalanceResponse>;
  getAllWallets(): Promise<WalletBalanceResponseWithUser[]>;
  updateUsersWalletBalance(
    userId: number,
    amount: number
  ): Promise<WalletBalanceResponse>;
}

export const WalletApi = "WalletApi";

export const withdrawWallet = z.object({
  amount: z.number().int().min(10000),
});

export class WithdrawWalletDto extends createZodDto(withdrawWallet) {
  @ApiProperty({
    description: "Amount to withdraw",
    type: Number,
    default: 10000,
  })
  amount: number;
}

export const updateUsersWalletBalance = z.object({
  amount: z.number().int(),
});

export class UpdateUsersWalletBalanceDto extends createZodDto(
  updateUsersWalletBalance
) {
  @ApiProperty({
    description: "Amount to add to the user's wallet",
    type: Number,
    default: 10000,
  })
  amount: number;
}

export class WalletBalanceResponse {
  @ApiProperty({
    description: "Amount of credits",
    type: Number,
    default: 11500,
  })
  credits: number;

  @ApiProperty({
    description: "Amount of euros",
    type: Number,
    default: 100.0,
  })
  euro: number;
}
export class UserWallet {
  @ApiProperty({
    description: "Id of the user",
    type: Number,
    default: 1,
  })
  id: number;

  @ApiProperty({
    description: "Firstname of the user",
    type: String,
    default: "John",
  })
  firstname: string;

  @ApiProperty({
    description: "Lastname of the user",
    type: String,
    default: "Doe",
  })
  lastname: string;

  @ApiProperty({
    description: "Email of the user",
    type: String,
    default: "jdoe@example.com",
  })
  email: string;
}

export class WalletBalanceResponseWithUser extends WalletBalanceResponse {
  @ApiProperty({
    description: "User object",
    type: UserWallet,
  })
  user: UserWallet;
}

export interface TransferMoneyReturn {
  transaction: Transaction;
  invoice: Invoice;
  withdraw: {
    feesPercentage: string;
    fees: number;
    amount: number;
    bank_account: StripeBankAccount;
  };
  session_uuid: string;
}
