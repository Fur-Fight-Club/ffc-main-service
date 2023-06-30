import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { ImgurService } from "src/services/imgur.service";
import { PrismaService } from "src/services/prisma.service";
import { MonsterController } from "./monster.controller";
import { MonsterRepository } from "./monster.repository";
import { MonsterService } from "./monster.service";

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [MonsterController],
  providers: [
    MonsterService,
    MonsterRepository,
    AuthService,
    AuthApiProvider,
    PrismaService,
    ImgurService,
    UserApiProvider,
  ],
})
export class MonsterModule {}
