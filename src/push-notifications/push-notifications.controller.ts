import { Body, Controller, Delete, Post } from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  UpsertNotificationTokenDto,
  DeleteNotificationTokenDto,
} from "src/api/notifications/push-notifications/push-notifications.schema";

@Controller("push-notifications")
export class PushNotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService
  ) {}

  @Post()
  async upsertNotificationToken(
    @Body(ZodValidationPipe) body: UpsertNotificationTokenDto
  ) {
    const { token, platform, userId } = body;
    return await this.pushNotificationsService.upsertNotificationToken(
      token,
      platform,
      userId
    );
  }

  @Delete()
  async deleteNotificationToken(
    @Body(ZodValidationPipe) body: DeleteNotificationTokenDto
  ) {
    const { token } = body;
    return await this.pushNotificationsService.deleteNotificationToken(token);
  }
}
