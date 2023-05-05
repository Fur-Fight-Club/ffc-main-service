import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  ConfirmAccountResponse,
  User,
  UserApi,
} from "src/api/auth/user/user.interface";
import { EmailApi } from "src/api/notifications/mails/mails.interface";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class AccountService {
  constructor(
    @Inject(UserApi) private readonly userApi: UserApi,
    @Inject(EmailApi) private readonly emailsApi: EmailApi,
    private readonly prisma: PrismaService
  ) {}

  async confirmAccount(email_token: string): ConfirmAccountResponse {
    return await this.userApi.confirmAccount(email_token);
  }

  async askResetPassword(email: string): Promise<boolean> {
    const authServiceRes = await this.userApi.askResetPassword(email);

    if (!authServiceRes.email_token) {
      throw new InternalServerErrorException("No email token returned");
    }

    // Get user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    const notificationsServiceRes = await this.emailsApi.sendPasswordResetEmail(
      email,
      user.firstname,
      authServiceRes.email_token
    );

    if (!notificationsServiceRes) {
      throw new InternalServerErrorException("Error while sending email");
    }

    return notificationsServiceRes;
  }

  async resetPassword(email_token: string, password: string): Promise<User> {
    return await this.userApi.resetPassword(email_token, password);
  }
}
