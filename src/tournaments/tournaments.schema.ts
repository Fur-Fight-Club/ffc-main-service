import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createTournamentSchema = z.object({
  name: z.string(),
  entry_cost: z.number(),
  arena_id: z.number(),
  start_date: z.date(),
});

export class CreateTournamentDto extends createZodDto(createTournamentSchema) {
  @ApiProperty({
    description: "The name of the tournament",
    example: "Lezgo boiis",
    type: String,
  })
  name: string;

  @ApiProperty({
    description: "The entry cost of the tournament",
    example: 1000,
    type: Number,
  })
  entry_cost: number;

  @ApiProperty({
    description: "The arena id of the tournament",
    example: 1,
    type: Number,
  })
  arena_id: number;

  @ApiProperty({
    description: "The start date of the tournament",
    example: new Date(),
    type: Date,
  })
  start_date: Date;
}

export const updateTounament = createTournamentSchema.partial();

export class UpdateTournamentDto extends createZodDto(updateTounament) {
  @ApiProperty({
    description: "The name of the tournament",
    example: "Lezgo boiis",
    type: String,
  })
  name?: string;

  @ApiProperty({
    description: "The entry cost of the tournament",
    example: 1000,
    type: Number,
  })
  entry_cost?: number;

  @ApiProperty({
    description: "The arena id of the tournament",
    example: 1,
    type: Number,
  })
  arena_id?: number;

  @ApiProperty({
    description: "The start date of the tournament",
    example: new Date(),
    type: Date,
  })
  start_date?: Date;
}
