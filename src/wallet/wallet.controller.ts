import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { WalletService } from "./wallet.service";
import {
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import {
  WithdrawWalletDto,
  WalletBalanceResponse,
  WalletBalanceResponseWithUser,
  UpdateUsersWalletBalanceDto,
} from "src/api/payments/wallet/wallet.schema";
import { UserGuard } from "src/auth/auth-user.guard";
import { JWTUserRequest } from "src/auth/auth.model";
import { Roles } from "src/decorators/roles.decorator";

@Controller("wallet")
@ApiTags("Wallet controller")
@UseGuards(UserGuard)
@ApiBearerAuth()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post("withdraw")
  @Roles("USER", "MONSTER_OWNER", "ADMIN")
  @ApiBody({
    description: "Withdraw money from the user's wallet",
    type: WithdrawWalletDto,
  })
  transferMoney(
    @Request() req: JWTUserRequest,
    @Body(ZodValidationPipe) body: WithdrawWalletDto
  ) {
    return this.walletService.transferMoney(req.user.sub, body.amount);
  }

  @Get("balance")
  @Roles("USER", "MONSTER_OWNER", "ADMIN")
  @ApiResponse({
    description: "The user's wallet balance",
    type: WalletBalanceResponse,
  })
  getBalance(@Request() req: JWTUserRequest) {
    return this.walletService.getBalance(req.user.sub);
  }

  @Get("users")
  @Roles("ADMIN")
  @ApiResponse({
    description: "Get all wallets",
    type: [WalletBalanceResponseWithUser],
  })
  getAllWallets() {
    return this.walletService.getAllWallets();
  }

  @Patch("user/:id/balance")
  @Roles("ADMIN")
  @ApiParam({
    description: "The id of the user",
    name: "id",
    type: Number,
  })
  @ApiBody({
    description: "Add money to the user's wallet",
    type: UpdateUsersWalletBalanceDto,
  })
  @ApiResponse({
    description: "The user's wallet balance",
    type: WalletBalanceResponse,
  })
  updateUsersWalletBalance(
    @Param("id", ParseIntPipe) id: string,
    @Body(ZodValidationPipe) body: UpdateUsersWalletBalanceDto
  ) {
    return this.walletService.updateUsersWalletBalance(+id, body.amount);
  }
}
