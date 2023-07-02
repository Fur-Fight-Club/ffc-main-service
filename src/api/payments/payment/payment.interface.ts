import {
  StripePaymentStatus,
  Transaction,
} from "ffc-prisma-package/dist/client";

export interface PaymentApi {
  paymentCallback(
    callback: string,
    session_id: string
  ): Promise<PaymentCallbackResponse>;
  getAllPayements(): Promise<Transaction[]>;
}

export type StripeCallback = "success" | "error";

export interface PaymentCallbackResponse {
  status: Omit<StripePaymentStatus, "PENDING">;
  session_id: string;
}

export const PaymentApi = "PaymentApi";
