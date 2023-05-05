import { ApiProperty } from "@nestjs/swagger";
import { MatchMessage } from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export interface MatchMessageApi {
  sendMessage(
    sender: number,
    match: number,
    message: string
  ): Promise<MatchMessage>;
}

/**
 * CREATE MESSAGE
 */
export const createMessage = z.object({
  sender: z.number().int(),
  match: z.number().int(),
  message: z.string(),
});

export class CreateMessageDto extends createZodDto(createMessage) {}
export type CreateMessageType = z.infer<typeof createMessage>;

export class CreateMessageApiBody {
  @ApiProperty({
    type: "string",
    default: "Hello World!",
  })
  message: string;
}

export const MatchMessageApi = "MatchMessageApi";
