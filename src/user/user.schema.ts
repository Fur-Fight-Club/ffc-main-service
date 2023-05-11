import { z } from "nestjs-zod/z";

export const userRoleSchema = z.enum(["ADMIN", "USER", "MONSTER_OWNER"]);

export const userSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z
    .password()
    .min(8)
    .atLeastOne("digit")
    .atLeastOne("lowercase")
    .atLeastOne("uppercase")
    .atLeastOne("special"),
  role: userRoleSchema,
  email_token: z.string(),
});

export type UserDto = z.infer<typeof userSchema>;
