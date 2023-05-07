import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { StripeCallback } from "src/api/payments/payment/payment.interface";
import { StripeCallbackValidationPipe } from "src/pipes/stripe-callback.pipe";
import { UUIDValidationPipe } from "src/pipes/uuid.pipe";
import { UserGuard } from "src/auth/auth-user.guard";

@Controller("payments")
@ApiTags("Payments controller")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(":callback/:session_id")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: "callback",
    description: "Callback type",
    enum: ["success", "error"],
  })
  @ApiParam({
    name: "session_id",
    description: "Payment session ID",
  })
  async stripeCallback(
    @Param("callback", StripeCallbackValidationPipe) callback: StripeCallback,
    @Param("session_id", UUIDValidationPipe) session_id: string
  ) {
    return this.paymentsService.paymentCallback(callback, session_id);
  }
}
