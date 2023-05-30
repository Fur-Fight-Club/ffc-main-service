import { Module } from "@nestjs/common";
import { MonsterService } from "./monster.service";
import { MonsterController } from "./monster.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";
import { MonsterRepository } from "./monster.repository";
import { ImgurService } from "src/services/imgur.service";

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
  ],
})
export class MonsterModule {}
