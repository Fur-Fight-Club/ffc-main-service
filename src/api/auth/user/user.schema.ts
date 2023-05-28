import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const userRoleSchema = z.enum(["ADMIN", "USER", "MONSTER_OWNER"]);

export const userSchema = z.object({
  id: z.number().int(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email().min(5),
  password: z.string(),
  role: userRoleSchema,
  email_token: z.string(),
});

export type UserInterface = z.infer<typeof userSchema>;
export type UserRoleInterface = z.infer<typeof userRoleSchema>;

/**
 * CONFIRM ACCOUNT TYPES
 */
export const confirmAccountSchema = userSchema.pick({
  email_token: true,
});

export class ConfirmAccountDto extends createZodDto(confirmAccountSchema) {}
export type ConfirmAccountType = z.infer<typeof confirmAccountSchema>;

/**
 * ASK RESET PASSWORD TYPES
 */
export const askResetPassword = userSchema.pick({
  email: true,
});

export class AskResetPasswordDto extends createZodDto(askResetPassword) {}
export type AskResetPasswordType = z.infer<typeof askResetPassword>;

export class AskResetPasswordApiBody {
  @ApiProperty({ type: "string", format: "email" })
  email: string;
}

/**
 * UPDATE USER
 */
export const updateUser = userSchema.pick({
  id: true,
  firstname: true,
  lastname: true,
  email: true,
  password: true,
});

export class UpdateUserDto extends createZodDto(updateUser) {}

/**
 * RESET PASSWORD TYPES
 */

export const resetPassword = userSchema.pick({
  email_token: true,
  password: true,
});

export class ResetPasswordDto extends createZodDto(resetPassword) {}
export type ResetPasswordType = z.infer<typeof resetPassword>;

export class ResetPasswordApiBody {
  @ApiProperty({
    type: "string",
    default: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  })
  email_token: string;

  @ApiProperty({ type: "string", format: "password" })
  password: string;
}

/**
 * GENERAL THINGS
 */

export interface UserApi {
  login(email: string, password: string): Promise<{ access_token: string }>;
  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<UserInterface>;
  confirmAccount(email_token: string): ConfirmAccountResponse;
  askResetPassword(email: string): Promise<{ email_token: string }>;
  resetPassword(email_token: string, password: string): Promise<UserInterface>;
  getById(id: number): Promise<UserInterface>;
  getAll(): Promise<UserInterface[]>;
  remove(id: number): Promise<UserInterface>;
  updateById(user: UpdateUserDto): Promise<UserInterface>;
}

export class LoginRequest {
  @ApiProperty({ type: "string", format: "binary" })
  email: string;
  @ApiProperty({ type: "string", format: "binary" })
  password: string;
}

export class RegisterRequest {
  @ApiProperty({ type: "string", format: "binary" })
  firstname: string;
  @ApiProperty({ type: "string", format: "binary" })
  lastname: string;
  @ApiProperty({ type: "string", format: "binary" })
  email: string;
  @ApiProperty({ type: "string", format: "binary" })
  password: string;
}

export class UpdateRequest {
  id: number;
  @ApiProperty({ type: "string", format: "binary" })
  @Optional()
  firstname: string;
  @ApiProperty({ type: "string", format: "binary" })
  @Optional()
  lastname: string;
  @ApiProperty({ type: "string", format: "binary" })
  @Optional()
  email: string;
  @ApiProperty({ type: "string", format: "binary" })
  @Optional()
  password: string;
}

export class UserResponse {
  @ApiProperty({ type: "number", format: "binary" })
  id: number;
  @ApiProperty({ type: "string", format: "binary" })
  firstname: string;
  @ApiProperty({ type: "string", format: "binary" })
  lastname: string;
  @ApiProperty({ type: "string", format: "binary" })
  email: string;
  @ApiProperty({ type: "string", format: "binary" })
  password: string;
  @ApiProperty({ type: "string", format: "binary" })
  role: UserRoleInterface;
  @ApiProperty({ type: "string", format: "binary" })
  email_token: string;
}

export class LoginResponse {
  @ApiProperty({ type: "string", format: "binary" })
  access_token: string;
}

export class ConfirmAccountApiBody {
  @ApiProperty({
    type: "string",
    default: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  })
  email_token: string;
}

export type ConfirmAccountResponse = Promise<boolean>;

export type AskResetPasswordResponse = Promise<boolean>;

export const UserApi = "UserApi";
