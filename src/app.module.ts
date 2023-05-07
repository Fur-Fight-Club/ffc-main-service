import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { PrismaService } from "./services/prisma.service";
import { UserModule } from "./user/user.module";
import { AccountModule } from "./account/account.module";
import { MatchModule } from "./match/match.module";
import { MonsterModule } from "./monster/monster.module";
import { CreditsModule } from "./credits/credits.module";
import { PaymentsModule } from "./payments/payments.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AccountModule,
    MatchModule,
    MonsterModule,
    CreditsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
