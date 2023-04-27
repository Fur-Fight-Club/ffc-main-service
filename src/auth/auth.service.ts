import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private config: ConfigService) { }

  signinService() {
    const payload = {
      iss: this.config.get<string>('issuer'),
      aud: "*",
      sub: this.config.get<string>('service'),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
