import {
  Inject,
  Injectable,
  NotFoundException,
  Provider,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthApi } from "../auth.interface";
import { ConfirmAccountResponse, User, UserApi } from "./user.interface";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";

@Injectable()
class UserApiImpl implements UserApi {
  constructor(@Inject(AuthApi) private authApi: AuthApi) {}
  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const response = await handleApiResponse<{ access_token: string } | null>(
      await this.authApi.fetch(`user/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
    );

    checkApiResponse(response, {
      401: () => new UnauthorizedException("Invalid credentials"),
    });

    return response;
  }
  async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<User> {
    const response = await handleApiResponse<User>(
      await this.authApi.fetch(`user/register`, {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }
  async confirmAccount(email_token: string): ConfirmAccountResponse {
    const response = await handleApiResponse<ConfirmAccountResponse>(
      await this.authApi.fetch(`user/confirm-account`, {
        method: "POST",
        body: JSON.stringify({
          email_token,
        }),
      })
    );

    checkApiResponse(response, {
      404: () => new UnauthorizedException("Invalid confirmation token"),
    });

    return response;
  }

  async askResetPassword(email: string): Promise<{ email_token: string }> {
    const response = await handleApiResponse<{ email_token: string }>(
      await this.authApi.fetch(`user/ask-reset-password`, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      })
    );

    checkApiResponse(response, {
      404: () => new NotFoundException("Can find this user"),
    });

    return response;
  }

  async resetPassword(email_token: string, password: string): Promise<User> {
    const response = await handleApiResponse<User>(
      await this.authApi.fetch(`user/reset-password`, {
        method: "PATCH",
        body: JSON.stringify({
          email_token,
          password,
        }),
      })
    );

    checkApiResponse(response, {
      404: () => new NotFoundException("Can find this user"),
    });

    return response;
  }
}

export const UserApiProvider: Provider = {
  provide: UserApi,
  useClass: UserApiImpl,
};
