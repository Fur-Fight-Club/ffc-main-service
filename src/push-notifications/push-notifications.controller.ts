import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  UpsertNotificationTokenDto,
  DeleteNotificationTokenDto,
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
}
