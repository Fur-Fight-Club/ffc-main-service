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
  fighter1: z.number().int(),
  fighter2: z.number().int(),
  arenaId: z.number().int(),
  matchStartDate: z.date(),
  matchEndDate: z.date(),
  weight_category: weightCategoryEnumSchema,
});

const createMatchSchema = matchSchema.pick({
  fighter1: true,
  arenaId: true,
  matchStartDate: true,
  matchEndDate: true,
  weight_category: true,
});

export type MatchInterface = z.infer<typeof matchSchema>;

export class CreateMatchDto extends createZodDto(createMatchSchema) {}
