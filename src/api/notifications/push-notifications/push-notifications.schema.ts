import { ApiProperty } from "@nestjs/swagger";
import {
  MatchMessage,
  NotificationSettings,
} from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface PushNotificationsApi {
  upsertNotificationToken(
    token: string,
    platform: string,
    userId: number
  ): Promise<NotificationSettings>;
  deleteNotificationToken(token: string): Promise<NotificationSettings>;
}
export const PushNotificationsApi = "PushNotificationsApi";

/**
 * UPSERT NOTIFICATION TOKEN
 */

export const upsertNotificationToken = z.object({
  token: z.string(),
  platform: z.enum(["IOS", "ANDROID", "WEB"]),
  userId: z.number().int(),
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

  @ApiProperty({
    type: "number",
    default: 1,
  })
  userId: number;
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
