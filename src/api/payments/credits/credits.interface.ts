import { ApiProperty } from "@nestjs/swagger";
import { Invoice, Transaction } from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface CreditsApi {
  buyCredits(
    user: number,
    amount: string,
    requestFrom: BuyCreditHeaders["x-request-from"]
  ): Promise<BuyCreditReturn>;
}

/**
 * BUY CREDITS
 */
export enum CreditsPacks {
  PACK_1 = "475",
  PACK_2 = "1000",
  PACK_3 = "2050",
  PACK_4 = "3650",
  PACK_5 = "5350",
  PACK_6 = "11000",
}

export const MoneyToCredits = {
  5: CreditsPacks.PACK_1,
  10: CreditsPacks.PACK_2,
  20: CreditsPacks.PACK_3,
  35: CreditsPacks.PACK_4,
  50: CreditsPacks.PACK_5,
  100: CreditsPacks.PACK_6,
};

export const CreditsToMoney = {
  [CreditsPacks.PACK_1]: 5,
  [CreditsPacks.PACK_2]: 10,
  [CreditsPacks.PACK_3]: 20,
  [CreditsPacks.PACK_4]: 35,
  [CreditsPacks.PACK_5]: 50,
  [CreditsPacks.PACK_6]: 100,
};

const creditEnumSchema = z.enum([
  CreditsPacks.PACK_1,
  CreditsPacks.PACK_2,
  CreditsPacks.PACK_3,
  CreditsPacks.PACK_4,
  CreditsPacks.PACK_5,
  CreditsPacks.PACK_6,
]);

export const CreditsDto = z.object({
  credits: creditEnumSchema,
});

export class BuyCreditDto extends createZodDto(CreditsDto) {
  @ApiProperty()
  credits: CreditsPacks;
}
export interface BuyCreditReturn {
  transaction: Transaction;
  invoice: Invoice;
  payment_url: string;
}

export interface BuyCreditHeaders {
  "x-request-from": "ios" | "android" | "web";
}

export const CreditsApi = "CreditsApi";
