import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { ServiceGuard } from "./auth-service.guard";
import { JWTServiceRequest } from "./auth.model";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login-service")
  // FOR TESTING PURPOSES ONLY — TO BE REMOVED
  signinService() {
    return this.authService.signinService();
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: "x-service-auth",
    description: "Token d'authentification pour les services Nest",
  }) // ajoute une description de l'en-tête x-service-auth
  @UseGuards(ServiceGuard)
  @Get("login-service")
  // FOR TESTING PURPOSES ONLY — TO BE REMOVED
  loginService(@Request() req: JWTServiceRequest) {
    return req.service;
  }
}
