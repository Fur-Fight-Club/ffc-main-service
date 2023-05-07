import { Request } from "express";
import { UserRole } from "src/api/auth/user/user.interface";

export interface JWTServicePayload {
  iss: string; // Issuer
  aud: string; // Audience
  sub:
    | "ffc-analytics-service"
    | "ffc-auth-service"
    | "ffc-main-service"
    | "ffc-notifications-service"
    | "ffc-payments-service"; // Authorized services
}

export interface JWTUserPayload {
  iss: string; // Issuer
  aud: string; // Audience
  sub: number; // User id
  role: UserRole;
  // Add more properties ?
}

export interface JWTServiceRequest extends Request {
  service: JWTServicePayload;
}

export interface JWTUserRequest extends Request {
  user: JWTUserPayload;
}
