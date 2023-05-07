import { SetMetadata } from "@nestjs/common";
import { UserRoleInterface } from "src/api/auth/user/user.schema";

export const Roles = (...roles: UserRoleInterface[]) =>
  SetMetadata("roles", roles);
