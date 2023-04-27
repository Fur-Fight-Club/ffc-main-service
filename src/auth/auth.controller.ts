import { Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTServiceRequest } from './auth.model';
import { ServiceGuard } from './auth-service.guard';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login-service')
  // FOR TESTING PURPOSES ONLY — TO BE REMOVED
  signinService() {
    return this.authService.signinService();
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'x-service-auth',
    description: 'Token d\'authentification pour les services Nest',
  }) // ajoute une description de l'en-tête x-service-auth
  @UseGuards(ServiceGuard)
  @Get('login-service')
  // FOR TESTING PURPOSES ONLY — TO BE REMOVED
  loginService(
    @Request() req: JWTServiceRequest,
  ) {
    return req.service;
  }
}
