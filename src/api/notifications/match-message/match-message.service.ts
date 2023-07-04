import { Inject, Injectable, Provider } from "@nestjs/common";
import { MatchMessage } from "ffc-prisma-package/dist/client";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { NotificationsApi } from "../notifications.interface";
import { MatchMessageApi } from "./match-message.interface";

@Injectable()
class MatchMessageImpl implements MatchMessageApi {
  constructor(
    @Inject(NotificationsApi) private notificationsApi: NotificationsApi
  ) {}
  async sendMessage(
    sender: number,
    match: number,
    message: string
  ): Promise<MatchMessage> {
    const response = await handleApiResponse<MatchMessage>(
      await this.notificationsApi.fetch(`match-message`, {
        method: "POST",
        body: JSON.stringify({
          sender,
          match,
          message,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }
}

export const MatchMessageApiProvider: Provider = {
  provide: MatchMessageApi,
  useClass: MatchMessageImpl,
};
