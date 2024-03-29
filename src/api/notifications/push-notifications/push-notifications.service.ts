import {
  Inject,
  Injectable,
  Provider,
  UnauthorizedException,
} from "@nestjs/common";
import { PushNotificationsApi } from "./push-notifications.schema";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { NotificationsApi } from "../notifications.interface";
import {
  MatchMessage,
  NotificationSettings,
} from "ffc-prisma-package/dist/client";

@Injectable()
class PushNotificationsImpl implements PushNotificationsApi {
  constructor(
    @Inject(NotificationsApi) private notificationsApi: NotificationsApi
  ) {}
  async upsertNotificationToken(
    token: string,
    platform: string,
    userId: number
  ): Promise<NotificationSettings> {
    const response = await handleApiResponse<NotificationSettings>(
      await this.notificationsApi.fetch(`push-notifications`, {
        method: "POST",
        body: JSON.stringify({
          token,
          platform,
          userId,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async deleteNotificationToken(token: string): Promise<NotificationSettings> {
    const response = await handleApiResponse<NotificationSettings>(
      await this.notificationsApi.fetch(`push-notifications`, {
        method: "DELETE",
        body: JSON.stringify({
          token,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async updateActiveStatus(
    token: string,
    active: boolean
  ): Promise<NotificationSettings> {
    const response = await handleApiResponse<NotificationSettings>(
      await this.notificationsApi.fetch(`push-notifications`, {
        method: "PATCH",
        body: JSON.stringify({
          token,
          active,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }
  sendNotificationToUser(
    userId: number,
    title: string,
    body: string,
    data: any
  ): Promise<boolean[]> {
    throw new Error("Method not implemented.");
  }
}

export const PushNotificationsApiProvider: Provider = {
  provide: PushNotificationsApi,
  useClass: PushNotificationsImpl,
};
