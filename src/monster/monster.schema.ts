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
  picture: z.string(),
});

const createMonsterSchema = monsterSchema.pick({
  name: true,
  weight: true,
  fk_user: true,
  weight_category: true,
  monster_type: true,
  picture: true,
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
  picture: true,
});

export class CreateMonsterDto extends createZodDto(createMonsterSchema) {
  @ApiProperty({
    description: "The name of the monster",
    example: "Godzilla",
    type: String,
  })
  name: string;

  @ApiProperty({
    description: "The weight of the monster",
    example: 1000,
    type: Number,
  })
  weight: number;

  @ApiProperty({
    description: "The weight category of the monster",
    example: "A_FINE_BOI",
    type: String,
  })
  weight_category: any;

  @ApiProperty({
    description: "The type of the monster",
    example: "ELEMENTARY",
    type: String,
  })
  monster_type: any;

  @ApiProperty({
    description: "The picture of the monster",
    example: "[base64_image]",
    type: String,
  })
  picture: string;

  @ApiProperty({
    description: "The id of the user",
    example: 1,
    type: Number,
  })
  fk_user: number;
}

export class GetMonsterDto extends createZodDto(getMonsterSchema) {}

export class UpdateMonsterDto extends createZodDto(updateMonsterSchema) {
  @ApiProperty({
    description: "The name of the monster",
    example: "Godzilla",
    type: String,
  })
  name: string;

  @ApiProperty({
    description: "The weight of the monster",
    example: 1000,
    type: Number,
  })
  weight: number;

  @ApiProperty({
    description: "The weight category of the monster",
    example: "A_FINE_BOI",
    type: String,
  })
  weight_category: any;

  @ApiProperty({
    description: "The type of the monster",
    example: "ELEMENTARY",
    type: String,
  })
  monster_type: any;

  @ApiProperty({
    description: "The picture of the monster",
    example: "[base64_image]",
    type: String,
  })
  picture: string;

  @ApiProperty({
    description: "The id of the monster",
    example: 1,
    type: Number,
  })
  id: number;
}

export type MonsterDto = z.infer<typeof monsterSchema>;
