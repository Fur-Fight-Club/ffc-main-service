import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as fs from "fs"

@Module({
  imports: [ConfigModule, JwtModule.register({
    global: true,
    signOptions: {
      expiresIn: '60s',
      algorithm: 'RS256',
    },
    privateKey: fs.readFileSync("ssl/service-auth-private.pem"),
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
