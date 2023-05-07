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

const monsterTypeEnumSchema = z.enum([
  "ELEMENTARY",
  "FANTASTIC",
  "MYTHOLOGICAL",
  "SCARY",
  "AQUATIC",
  "WINGED",
  "PREHISTORIC",
  "MECHANICAL",
  "EXTRATERRESTRIAL",
  "MAGICAL",
]);

export const monsterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  weight: z.number(),
  weight_category: weightCategoryEnumSchema,
  monster_type: monsterTypeEnumSchema,
  User: z.object({}),
  fk_user: z.number().int(),
  Fighter: z.array(z.number().int()),
});

const createMonsterSchema = monsterSchema.pick({
  name: true,
  weight: true,
  fk_user: true,
  weight_category: true,
  monster_type: true,
});

const getMonsterSchema = monsterSchema.pick({
  id: true,
});

const updateMonsterSchema = monsterSchema.pick({
  id: true,
  name: true,
  weight: true,
  weight_category: true,
  monster_type: true,
});

const removeMonsterSchema = monsterSchema.pick({
  id: true,
});

export class CreateMonsterDto extends createZodDto(createMonsterSchema) {}

export class GetMonsterDto extends createZodDto(getMonsterSchema) {}

export class UpdateMonsterDto extends createZodDto(updateMonsterSchema) {}

export class RemoveMonsterDto extends createZodDto(removeMonsterSchema) {}

export type MonsterDto = z.infer<typeof monsterSchema>;
