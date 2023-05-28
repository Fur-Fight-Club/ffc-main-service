import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CreditsService } from "./credits.service";
import { ApiTags, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import {
  BuyCreditDto,
  BuyCreditHeaders,
} from "src/api/payments/credits/credits.interface";
import { JWTUserRequest } from "src/auth/auth.model";
import { UserGuard } from "src/auth/auth-user.guard";

@Controller("credits")
@ApiTags("Credits controller")
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post("buy")
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: BuyCreditDto,
  })
  async buyCredits(
    @Body(ZodValidationPipe) body: BuyCreditDto,
    @Request() req: JWTUserRequest,
    @Headers() headers: BuyCreditHeaders
  ) {
    return this.creditsService.buyCredits(
      body.credits,
      req.user.sub,
      headers["x-request-from"]
    );
  }
}
