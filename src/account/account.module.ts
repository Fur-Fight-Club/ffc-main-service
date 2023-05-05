import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AuthApiProvider } from 'src/api/auth/auth.service';
import { UserApiProvider } from 'src/api/auth/user/user.service';
import { AuthModule } from 'src/api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AuthService, AuthApiProvider, UserApiProvider],
})
export class AccountModule { }
