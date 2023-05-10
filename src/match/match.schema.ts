import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const weightCategoryEnumSchema = z.enum([
  "A_FINE_BOI",
  "HE_CHOMNK",
  "A_HECKING_CHONKER",
  "HEFTY_CHONK",
  "MEGA_CHONKER",
  "OH_LAWD_HE_COMIN",
]);

const matchSchema = z.object({
  id: z.number().int(),
  monster1: z.number().int().describe("Monster 1 ID"),
  monster2: z.number().int().describe("Monster 2 ID"),
  fk_arena: z.number().int().describe("Arena ID"),
  matchStartDate: z.dateString().describe("Match start date"),
  matchEndDate: z.dateString().describe("Match end date"),
  weight_category: weightCategoryEnumSchema.describe("Weight category"),
});

const createMatchSchema = matchSchema.pick({
  monster1: true,
  fk_arena: true,
  matchStartDate: true,
  weight_category: true,
});

const getMatchSchema = matchSchema.pick({
  id: true,
});

const updateMatchSchema = matchSchema.pick({
  id: true,
  fk_arena: true,
  monster1: true,
  monster2: true,
  matchStartDate: true,
  matchEndDate: true,
  weight_category: true,
});

const deleteMatchSchema = matchSchema.pick({
  id: true,
});

const closeMatchSchema = matchSchema.pick({
  id: true,
});

export type MatchInterface = z.infer<typeof matchSchema>;

export type WeightCategoryEnum = z.infer<typeof weightCategoryEnumSchema>;

export class CreateMatchDto extends createZodDto(createMatchSchema) {
  @ApiProperty({ type: "number", format: "int32" })
  monster1: number;
  @ApiProperty({ type: "number", format: "int32" })
  fk_arena: number;
  @ApiProperty({ type: "string", format: "date-time" })
  matchStartDate: string;
  @ApiProperty({ enum: weightCategoryEnumSchema.enum })
  weight_category: WeightCategoryEnum;
}

export class GetMatchDto extends createZodDto(getMatchSchema) {}

export class UpdateMatchDto extends createZodDto(updateMatchSchema) {
  @ApiProperty({ type: "number", format: "int32" })
  id: number;
  @ApiProperty({ type: "number", format: "int32" })
  fk_arena: number;
  @ApiProperty({ type: "number", format: "int32" })
  monster1: number;
  @ApiProperty({ type: "number", format: "int32" })
  monster2: number;
  @ApiProperty({ type: "string", format: "date-time" })
  matchStartDate: string;
  @ApiProperty({ type: "string", format: "date-time" })
  matchEndDate: string;
  @ApiProperty({ enum: weightCategoryEnumSchema.enum })
  weight_category: WeightCategoryEnum;
}

export class DeleteMatchDto extends createZodDto(deleteMatchSchema) {}

export class CloseMatchDto extends createZodDto(closeMatchSchema) {}

/*
    MATCH WAITING LIST
*/
const statusEnumSchema = z.enum(["ACCEPTED", "REJECTED", "PENDING"]);

const matchWaitingListSchema = z.object({
  id: z.number().int(),
  monster: z.number().int(),
  match: z.number().int(),
  status: statusEnumSchema,
});

const joinMatchWaitingListSchema = matchWaitingListSchema.pick({
  id: true,
  monster: true,
});
const createMatchWaitingListSchema = matchWaitingListSchema.pick({
  monster: true,
});

const validateMatchWaitingListControllerSchema = matchWaitingListSchema.pick({
  monster: true,
});

const validateMatchWaitingListSerivceSchema = matchWaitingListSchema.pick({
  id: true,
  monster: true,
});

export type StatusEnum = z.infer<typeof statusEnumSchema>;

export class CreateMatchWaitingListDto extends createZodDto(
  createMatchWaitingListSchema
) {}

export class JoinMatchWaitingListDto extends createZodDto(
  joinMatchWaitingListSchema
) {}

export class ValidateMatchWaitingListControllerDto extends createZodDto(
  validateMatchWaitingListControllerSchema
) {
  @ApiProperty({ enum: statusEnumSchema.enum })
  status: StatusEnum;
}

export class ValidateMatchWaitingListServiceDto extends createZodDto(
  validateMatchWaitingListSerivceSchema
) {}
