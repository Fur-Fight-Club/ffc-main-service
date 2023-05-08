import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { BankAccountService } from "./bank-account.service";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateBankAccountDto } from "src/api/payments/bank-account/bank-account.schema";
import { JWTUserRequest } from "src/auth/auth.model";
import { UserGuard } from "src/auth/auth-user.guard";

@Controller("bank-account")
@ApiTags("Bank account controller")
@UseGuards(UserGuard)
@ApiBearerAuth()
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiBody({
    description: "Add a bank account to the user",
    type: CreateBankAccountDto,
  })
  addBankAccount(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @Request() req: JWTUserRequest
  ) {
    return this.bankAccountService.addBankAccount(
      createBankAccountDto,
      req.user.sub
    );
  }

  @Get()
  getBankAccount(@Request() req: JWTUserRequest) {
    return this.bankAccountService.getBankAccount(req.user.sub);
  }

  @Delete()
  deleteBankAccount(@Request() req: JWTUserRequest) {
    return this.bankAccountService.deleteBankAccount(req.user.sub);
  }
}
