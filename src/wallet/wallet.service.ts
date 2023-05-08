import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { EmailApi } from "src/api/notifications/mails/mails.schema";
import { WalletApi } from "src/api/payments/wallet/wallet.schema";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class WalletService {
  constructor(
    @Inject(WalletApi) private readonly walletApi: WalletApi,
    @Inject(EmailApi) private readonly emailApi: EmailApi,
    private readonly prismaService: PrismaService
  ) {}
  async updateUsersWalletBalance(userId: number, amount: number) {
    return this.walletApi.updateUsersWalletBalance(userId, amount);
  }
  async getAllWallets() {
    return this.walletApi.getAllWallets();
  }
  async getBalance(userId: number) {
    return this.walletApi.getBalance(userId);
  }
  async transferMoney(userId: number, amount: number) {
    const moneyTransfer = await this.walletApi.transferMoney(userId, amount);

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    const withdrawEmail = await this.emailApi.sendWithdrawInvoiceEmail(
      user.email,
      user.firstname,
      moneyTransfer.invoice.uuid,
      moneyTransfer.invoice.url,
      moneyTransfer.withdraw.amount + moneyTransfer.withdraw.fees,
      moneyTransfer.withdraw.feesPercentage,
      moneyTransfer.withdraw.fees,
      moneyTransfer.withdraw.amount,
      moneyTransfer.withdraw.bank_account.last4
    );

    if (!withdrawEmail) {
      throw new BadRequestException("Error sending withdraw email");
    }

    return moneyTransfer;
  }
}
