import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const monsterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  weight: z.number(),
  fk_user: z.number().int(),
  weightCategoryId: z.number().int(),
  monsterTypeId: z.number().int(),
  Fighter: z.array(z.number().int()),
});

const createMonsterSchema = monsterSchema.pick({
  name: true,
  weight: true,
  fk_user: true,
  weightCategoryId: true,
  monsterTypeId: true,
});

export class CreateMonsterDto extends createZodDto(createMonsterSchema) {}

export type MonsterDto = z.infer<typeof monsterSchema>;
