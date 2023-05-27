import { Inject, Injectable } from "@nestjs/common";
import { PushNotificationsApi } from "src/api/notifications/push-notifications/push-notifications.schema";

@Injectable()
export class PushNotificationsService {
  constructor(
    @Inject(PushNotificationsApi)
    private pushNotificationsApi: PushNotificationsApi
  ) {}

  async deleteNotificationToken(token: string) {
    return await this.pushNotificationsApi.deleteNotificationToken(token);
  }
  async upsertNotificationToken(
    token: string,
    platform: string,
    userId: number
  ) {
    return await this.pushNotificationsApi.upsertNotificationToken(
      token,
      platform,
      userId
    );
  }
}
