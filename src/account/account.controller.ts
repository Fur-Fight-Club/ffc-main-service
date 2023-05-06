import { Body, Controller, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import {
  AskResetPasswordApiBody,
  AskResetPasswordDto,
  ConfirmAccountApiBody,
  ConfirmAccountDto,
  ResetPasswordApiBody,
  ResetPasswordDto,
} from "src/api/auth/user/user.schema";
import { AccountService } from "./account.service";

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
  async askResetPassword(@Body(ZodValidationPipe) body: AskResetPasswordDto) {
    return await this.accountService.askResetPassword(body.email);
  }

  @Patch("reset-password")
  @ApiBody({
    description: "Reset user's password with email token",
    type: ResetPasswordApiBody,
  })
  async resetPassword(@Body(ZodValidationPipe) body: ResetPasswordDto) {
    return await this.accountService.resetPassword(
      body.email_token,
      body.password
    );
  }
}
