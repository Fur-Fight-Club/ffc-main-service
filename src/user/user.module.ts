import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule as AuthApiModule, } from 'src/api/auth/auth.module';
import { AuthApiProvider } from 'src/api/auth/auth.service';
import { UserApiProvider } from 'src/api/auth/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [ConfigModule, AuthApiModule],
  controllers: [UserController],
  providers: [UserService, AuthApiProvider, UserApiProvider, AuthService]
})
export class UserModule { }
