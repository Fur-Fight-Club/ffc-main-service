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
    invoice_id: number,
    attachment: string
  ): Promise<boolean>;
}

/**
 * SEND INVOICE EMAIL
 */
export const sendInvoiceEmail = z.object({
  email: z.string().email(),
  name: z.string(),
  price: z.number(),
  invoice_id: z.number(),
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
  @ApiProperty({ type: "number" })
  invoice_id: number;
  @ApiProperty({ type: "string" })
  attachment: string;
}

export const EmailApi = "EmailApi";
