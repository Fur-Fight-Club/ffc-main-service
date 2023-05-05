import { Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import {
  AskResetPasswordApiBody,
  ConfirmAccountApiBody,
  ConfirmAccountDto,
} from "src/api/auth/user/user.interface";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("account")
@ApiTags("Account Controller")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post("confirm")
  @ApiBody({
    description: "Confirm user's account with email token",
    type: ConfirmAccountApiBody,
  })
  async confirmAccount(@Body(ZodValidationPipe) body: ConfirmAccountDto) {
    return await this.accountService.confirmAccount(body.email_token);
  }

  @Post("ask-reset-password")
  @ApiBody({
    description: "Ask for a password reset",
    type: AskResetPasswordApiBody,
  })
  async askResetPassword(
    @Body(ZodValidationPipe) body: AskResetPasswordApiBody
  ) {
    return await this.accountService.askResetPassword(body.email);
  }
}
