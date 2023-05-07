import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export class AreanApiResponse {
  @ApiProperty({
    type: "integer",
  })
  id: number;

  @ApiProperty({
    type: "string",
  })
  name: string;

  @ApiProperty({
    type: "string",
  })
  address: string;

  @ApiProperty({
    type: "string",
  })
  address2?: string;

  @ApiProperty({
    type: "string",
  })
  city: string;

  @ApiProperty({
    type: "string",
  })
  zipcode: string;

  @ApiProperty({
    type: "string",
  })
  country: string;
}

export const arenaSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zipcode: z.string().length(5),
  country: z.string(),
});

/**
 * CREATE ARENA
 */

const createArenaSchema = arenaSchema.pick({
  name: true,
  address: true,
  address2: true,
  city: true,
  zipcode: true,
  country: true,
});

export class CreateArenaDto extends createZodDto(createArenaSchema) {
  @ApiProperty({
    type: "string",
  })
  name: string;

  @ApiProperty({
    type: "string",
  })
  address: string;

  @ApiProperty({
    type: "string",
  })
  address2?: string;

  @ApiProperty({
    type: "string",
  })
  city: string;

  @ApiProperty({
    type: "string",
  })
  zipcode: string;

  @ApiProperty({
    type: "string",
  })
  country: string;
}

/**
 * UPDATE ARENA
 */

const updateArenaSchema = arenaSchema.pick({
  id: true,
  name: true,
});

export class UpdateArenaDto extends createZodDto(updateArenaSchema) {
  @ApiProperty({
    type: "string",
  })
  name: string;
}

/**
 * GET ARENA
 */

const getArenaSchema = arenaSchema.pick({
  id: true,
});

export class GetArenaDto extends createZodDto(getArenaSchema) {}

/**
 * DELETE ARENA
 */

const deleteArenaSchema = arenaSchema.pick({
  id: true,
});

export class DeleteArenaDto extends createZodDto(deleteArenaSchema) {}
