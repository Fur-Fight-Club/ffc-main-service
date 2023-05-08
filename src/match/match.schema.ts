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
  monster1: z.number().int(),
  monster2: z.number().int(),
  fk_arena: z.number().int(),
  matchStartDate: z.dateString(),
  matchEndDate: z.dateString(),
  weight_category: weightCategoryEnumSchema,
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

export type MatchInterface = z.infer<typeof matchSchema>;

export class CreateMatchDto extends createZodDto(createMatchSchema) {}

export class GetMatchDto extends createZodDto(getMatchSchema) {}

export class UpdateMatchDto extends createZodDto(updateMatchSchema) {}

export class DeleteMatchDto extends createZodDto(deleteMatchSchema) {}

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

const createMatchWaitingListSchema = matchWaitingListSchema.pick({
  id: true,
  monster: true,
  match: true,
  status: true,
});

const validateMatchWaitingListSchema = matchWaitingListSchema.pick({
  id: true,
  monster: true,
  match: true,
  status: true,
});

export type StatusEnum = z.infer<typeof statusEnumSchema>;

export class CreateMatchWaitingListDto extends createZodDto(
  createMatchWaitingListSchema
) {}

export class ValidateMatchWaitingListDto extends createZodDto(
  validateMatchWaitingListSchema
) {}
