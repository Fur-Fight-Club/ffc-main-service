import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface EmailApi {
  sendConfirmationEmail(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean>;
  sendPasswordResetEmail(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean>;
  sendInvoiceEmail(
    email: string,
    name: string,
    price: number,
    invoice_id: string,
    attachment: string
  ): Promise<boolean>;
  sendWithdrawInvoiceEmail(
    email: string,
    name: string,
    invoice_id: string,
    invoice_url: string,
    totalWithdraw: number,
    feesPercentage: string,
    feesAmount: number,
    amount: number,
    lastDigits: string
  ): Promise<boolean>;
}

/**
 * SEND INVOICE EMAIL
 */
export const sendInvoiceEmail = z.object({
  email: z.string().email(),
  name: z.string(),
  price: z.number(),
  invoice_id: z.string(),
  attachment: z.string(),
});

export class SendInvoiceEmailDto extends createZodDto(sendInvoiceEmail) {}

export type SendInvoiceEmailType = z.infer<typeof sendInvoiceEmail>;

export class SendInvoiceEmailApiBody {
  @ApiProperty({ type: "string", format: "email" })
  email: string;
  @ApiProperty({ type: "string" })
  name: string;
  @ApiProperty({ type: "number" })
  price: number;
  @ApiProperty({ type: "string" })
  invoice_id: string;
  @ApiProperty({ type: "string" })
  attachment: string;
}

/**
 * WITHDRAW INVOICE
 */
export const withdrawInvoice = z.object({
  email: z.string().email(),
  name: z.string(),
  invoice_id: z.string(),
  invoice_url: z.string(),
  totalWithdraw: z.number(),
  feesPercentage: z.string(),
  fees: z.number(),
  amount: z.number(),
  lastDigits: z.string().length(4),
});

export class WithdrawInvoiceDto extends createZodDto(withdrawInvoice) {
  @ApiProperty({ type: "string", format: "email" })
  email: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  invoice_id: string;

  @ApiProperty({ type: "number" })
  totalWithdraw: number;

  @ApiProperty({ type: "string" })
  feesPercentage: string;

  @ApiProperty({ type: "number" })
  fees: number;

  @ApiProperty({ type: "number" })
  amount: number;

  @ApiProperty({ type: "string" })
  lastDigits: string;
}

export const EmailApi = "EmailApi";
