import { Injectable, Provider } from "@nestjs/common";
import { AnalyticsApi } from "./analytics.interface";
import { ConfigService } from "@nestjs/config";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { prepareRequestUrl, prepareRequestInit } from "src/utils/api.utils";
import { AuthService } from "src/auth/auth.service";

@Injectable()
class AnalyticsApiImpl implements AnalyticsApi {
  private baseUrl: string;
  constructor(
    private configService: ConfigService,
    private serviceAuth: AuthService
  ) {
    this.baseUrl = this.configService.get<string>("ffc_analytics_url")!;
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

export const AnalyticsApiProvider: Provider = {
  provide: AnalyticsApi,
  useClass: AnalyticsApiImpl,
};
