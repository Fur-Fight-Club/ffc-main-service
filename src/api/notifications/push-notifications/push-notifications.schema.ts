import { ApiProperty } from "@nestjs/swagger";
import {
  MatchMessage,
  NotificationSettings,
} from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface PushNotificationsApi {
  sendNotificationToUser(
    userId: number,
    title: string,
    body: string,
    data: any
  ): unknown;
  upsertNotificationToken(
    token: string,
    platform: string,
    userId: number
  ): Promise<NotificationSettings>;
  deleteNotificationToken(token: string): Promise<NotificationSettings>;
  updateActiveStatus(
    token: string,
    active: boolean
  ): Promise<NotificationSettings>;
  sendNotificationToUser(
    userId: number,
    title: string,
    body: string,
    data: any
  ): Promise<boolean[]>;
}
export const PushNotificationsApi = "PushNotificationsApi";

/**
 * UPSERT NOTIFICATION TOKEN
 */

export const upsertNotificationToken = z.object({
  token: z.string(),
  platform: z.enum(["IOS", "ANDROID", "WEB"]),
});

export class UpsertNotificationTokenDto extends createZodDto(
  upsertNotificationToken
) {
  @ApiProperty({
    type: "string",
  })
  token: string;

  @ApiProperty({
    type: "string",
    enum: ["IOS", "ANDROID", "WEB"],
  })
  platform: "IOS" | "ANDROID" | "WEB";
}

export type UpsertNotificationTokenType = z.infer<
  typeof upsertNotificationToken
>;

/**
 * DELETE NOTIFICATION TOKEN
 */

export const deleteNotificationToken = z.object({
  token: z.string(),
});

export class DeleteNotificationTokenDto extends createZodDto(
  deleteNotificationToken
) {
  @ApiProperty({
    type: "string",
  })
  token: string;
}

export type DeleteNotificationTokenType = z.infer<
  typeof deleteNotificationToken
>;

/**
 * UPDATE ACTIVE STATUS
 */

export const updateActiveStatus = z.object({
  token: z.string(),
  active: z.boolean(),
});

export class UpdateActiveStatusDto extends createZodDto(updateActiveStatus) {
  @ApiProperty({
    type: "string",
  })
  token: string;

  @ApiProperty({
    type: "boolean",
  })
  active: boolean;
}

export type UpdateActiveStatusType = z.infer<typeof updateActiveStatus>;

/**
 * SEND PUSH NOTIFICATION
 */

export const sendPushNotification = z.object({
  title: z.string(),
  body: z.string(),
  data: z.any(),
});

export class SendPushNotificationDto extends createZodDto(
  sendPushNotification
) {
  @ApiProperty({
    type: "string",
  })
  title: string;

  @ApiProperty({
    type: "string",
  })
  body: string;

  @ApiProperty({
    type: "object",
  })
  data: any;
}

export type SendPushNotificationType = z.infer<typeof sendPushNotification>;
