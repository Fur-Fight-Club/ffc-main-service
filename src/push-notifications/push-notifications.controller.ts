import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  UpsertNotificationTokenDto,
  DeleteNotificationTokenDto,
  UpdateActiveStatusDto,
  SendPushNotificationDto,
} from "src/api/notifications/push-notifications/push-notifications.schema";
import { UserGuard } from "src/auth/auth-user.guard";
import { Roles } from "src/decorators/roles.decorator";
import { ApiTags } from "@nestjs/swagger";
import { JWTUserRequest } from "src/auth/auth.model";

@Controller("push-notifications")
@ApiTags("Push Notifications Controller")
@UseGuards(UserGuard)
export class PushNotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService
  ) {}

  @Post()
  @Roles("USER", "MONSTER_OWNER", "ADMIN")
  async upsertNotificationToken(
    @Body(ZodValidationPipe) body: UpsertNotificationTokenDto,
    @Request() req: JWTUserRequest
  ) {
    const { token, platform } = body;
    const userId = req.user.sub;
    return await this.pushNotificationsService.upsertNotificationToken(
      token,
      platform,
      userId
    );
  }

  @Delete()
  @Roles("USER", "MONSTER_OWNER", "ADMIN")
  async deleteNotificationToken(
    @Body(ZodValidationPipe) body: DeleteNotificationTokenDto
  ) {
    const { token } = body;
    return await this.pushNotificationsService.deleteNotificationToken(token);
  }

  @Patch("active")
  @Roles("USER", "MONSTER_OWNER", "ADMIN")
  async updateActiveStatus(
    @Body(ZodValidationPipe) body: UpdateActiveStatusDto
  ) {
    const { token, active } = body;
    return await this.pushNotificationsService.updateActiveStatus(
      token,
      active
    );
  }

  @Post("send")
  @Roles("ADMIN")
  async sendNotificationToUser(
    @Body(ZodValidationPipe) body: SendPushNotificationDto,
    @Request() req: JWTUserRequest
  ) {
    const { title, body: message, data } = body;
    return await this.pushNotificationsService.sendNotificationToUser(
      req.user.sub,
      title,
      message,
      data
    );
  }
}
