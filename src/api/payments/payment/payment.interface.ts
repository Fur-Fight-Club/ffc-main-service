import { ApiProperty } from "@nestjs/swagger";
import {
  Invoice,
  StripePaymentStatus,
  Transaction,
} from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface PaymentApi {
  paymentCallback(callback: string, session_id: string);
}

export type StripeCallback = "success" | "error";

export interface PaymentCallbackResponse {
  status: Omit<StripePaymentStatus, "PENDING">;
  session_id: string;
}

export const PaymentApi = "PaymentApi";
