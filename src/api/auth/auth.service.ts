import { Injectable, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { AuthService } from "src/auth/auth.service";
import { prepareRequestInit, prepareRequestUrl } from "src/utils/api.utils";
import { AuthApi } from "./auth.interface";

@Injectable()
class AuthApiImpl implements AuthApi {
  private baseUrl: string;
  constructor(
    private configService: ConfigService,
    private serviceAuth: AuthService
  ) {
    this.baseUrl = this.configService.get<string>("ffc_auth_url")!;
  }

  async fetch(url: RequestInfo, init: RequestInit): Promise<Response> {
    const serviceToken = this.serviceAuth.signinService();
    const requestUrl = prepareRequestUrl(url);
    const requestInit = prepareRequestInit({
      ...init,
      headers: {
        "x-service-auth": `Bearer ${
          this.serviceAuth.signinService().access_token
        }`,
      },
    });
    return fetch(this.baseUrl + "/" + requestUrl, requestInit);
  }
}

export const AuthApiProvider: Provider = {
  provide: AuthApi,
  useClass: AuthApiImpl,
};
