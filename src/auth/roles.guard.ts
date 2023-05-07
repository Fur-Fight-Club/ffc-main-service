import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JWTUserRequest } from "./auth.model";
import { UserRoleInterface } from "src/api/auth/user/user.schema";

const matchRoles = (roles: UserRoleInterface[], userRole: string): boolean => {
  return roles.some((r) => r === userRole);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRoleInterface[]>(
      "roles",
      context.getHandler()
    );

    if (!roles) {
      return true;
    }
    const request: JWTUserRequest = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.role);
  }
}
