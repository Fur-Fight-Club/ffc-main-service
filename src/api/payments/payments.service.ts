import { Injectable, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { AuthService } from "src/auth/auth.service";
import { prepareRequestInit, prepareRequestUrl } from "src/utils/api.utils";
import { PaymentsApi } from "./payments.interface";

@Injectable()
class PaymentsApiImpl implements PaymentsApi {
  private baseUrl: string;
  constructor(
    private configService: ConfigService,
    private serviceAuth: AuthService
  ) {
    this.baseUrl = this.configService.get<string>("ffc_payments_url")!;
  }

  async fetch(url: RequestInfo, init: RequestInit): Promise<Response> {
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

export const PaymentsApiProvider: Provider = {
  provide: PaymentsApi,
  useClass: PaymentsApiImpl,
};
