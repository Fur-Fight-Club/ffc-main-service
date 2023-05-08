import { ApiProperty } from "@nestjs/swagger";
import { StripeBankAccount } from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface BankAccountApi {
  addBankAccount(userId: number, iban: string): Promise<StripeBankAccount>;
  getBankAccount(userId: number): Promise<StripeBankAccount>;
  deleteBankAccount(userId: number): Promise<StripeBankAccount>;
}

export const createBankAccount = z.object({
  iban: z.string(),
});

export class CreateBankAccountDto extends createZodDto(createBankAccount) {
  @ApiProperty({
    description: "The IBAN of the user",
    example: "DE89370400440532013000",
  })
  iban: string;
}

export const BankAccountApi = "BankAccountApi";
