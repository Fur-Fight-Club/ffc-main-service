import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { StripeCallback } from "src/api/payments/payment/payment.interface";
import { UserGuard } from "src/auth/auth-user.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { StripeCallbackValidationPipe } from "src/pipes/stripe-callback.pipe";
import { UUIDValidationPipe } from "src/pipes/uuid.pipe";
import { PaymentsService } from "./payments.service";

@Controller("payments")
@UseGuards(UserGuard, RolesGuard)
@ApiTags("Payments controller")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(":callback/:session_id")
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

  @Get("all")
  @Roles("ADMIN")
  @ApiBearerAuth()
  async getAllPayments() {
    return await this.paymentsService.getAllPayments();
  }
}
