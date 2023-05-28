import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  LoginRequest,
  RegisterRequest,
  UserApi,
} from "src/api/auth/user/user.schema";
import { EmailApi } from "src/api/notifications/mails/mails.schema";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserApi) private userApi: UserApi,
    @Inject(EmailApi) private emailsApi: EmailApi
  ) {}

  async login(params: LoginRequest) {
    return await this.userApi.login(params.email, params.password);
  }

  async register(params: RegisterRequest) {
    const user = await this.userApi.register(
      params.firstname,
      params.lastname,
      params.email,
      params.password
    );
    await this.sendConfirmationEmail(
      user.email,
      user.firstname,
      user.email_token
    );
    return user;
  }

  async getById(id: number) {
    return await this.userApi.getById(id);
  }

  async getAllUsers() {
    return await this.userApi.getAll();
  }

  async remove(id: number) {
    return await this.userApi.remove(id);
  }

  private async sendConfirmationEmail(
    email: string,
    firstname: string,
    token: string
  ) {
    const confirmationEmail = this.emailsApi.sendConfirmationEmail(
      email,
      firstname,
      token
    );
    if (confirmationEmail) {
      return true;
    } else {
      throw new InternalServerErrorException(
        "Could not send confirmation email"
      );
    }
  }
}
