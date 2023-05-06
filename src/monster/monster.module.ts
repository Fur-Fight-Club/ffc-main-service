import { Module } from "@nestjs/common";
import { MonsterService } from "./monster.service";
import { MonsterController } from "./monster.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [MonsterController],
  providers: [MonsterService, AuthService, AuthApiProvider, PrismaService],
})
export class MonsterModule {}
