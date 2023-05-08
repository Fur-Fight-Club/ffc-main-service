import { Inject, Injectable } from "@nestjs/common";
import { WalletApi } from "src/api/payments/wallet/wallet.schema";

@Injectable()
export class WalletService {
  constructor(@Inject(WalletApi) private readonly walletApi: WalletApi) {}
  updateUsersWalletBalance(userId: number, amount: number) {
    return this.walletApi.updateUsersWalletBalance(userId, amount);
  }
  getAllWallets() {
    return this.walletApi.getAllWallets();
  }
  getBalance(userId: number) {
    return this.walletApi.getBalance(userId);
  }
  transferMoney(userId: number, amount: number) {
    return this.walletApi.transferMoney(userId, amount);
  }
}
