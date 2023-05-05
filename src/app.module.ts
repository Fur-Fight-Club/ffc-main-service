import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaService } from './services/prisma.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }), AuthModule, UserModule, AccountModule, MatchModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
