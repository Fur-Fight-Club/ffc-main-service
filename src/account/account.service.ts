import { Inject, Injectable } from '@nestjs/common';
import { ConfirmAccountResponse, UserApi } from 'src/api/auth/user/user.interface';

@Injectable()
export class AccountService {
  constructor(@Inject(UserApi) private readonly userApi: UserApi) { }

  async confirmAccount(email_token: string): ConfirmAccountResponse {
    return await this.userApi.confirmAccount(email_token);
  }
}
