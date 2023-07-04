import { ApiProperty } from "@nestjs/swagger";
import { Match } from "ffc-prisma-package/dist/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createTournamentSchema = z.object({
  name: z.string(),
  entry_cost: z.number(),
  arena_id: z.number(),
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
}

export const joinTournamentSchema = z.object({
  monster_id: z.number(),
});

export class JoinTournamentDto extends createZodDto(joinTournamentSchema) {
  @ApiProperty({
    description: "The monster id of the monster to be joined",
    example: 1,
    type: Number,
  })
  monster_id: number;
}

export interface JoinTournamentResponse {
  tournamentId: number;
  joined: boolean;
}

export const endRoundSchema = z.object({
  winner_id: z.number(),
  match_id: z.number(),
});

export class EndRoundDto extends createZodDto(endRoundSchema) {
  @ApiProperty({
    description: "The id of the winner",
    example: 1,
    type: Number,
  })
  winner_id: number;

  @ApiProperty({
    description: "The id of the match",
    example: 1,
    type: Number,
  })
  match_id: number;
}

export interface EndRoundResponse {
  endDate: Date;
  winner: number;
  nextMatch?: Match;
}
