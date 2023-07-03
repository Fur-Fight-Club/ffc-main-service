import { Module } from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import { TournamentsController } from "./tournaments.controller";
import { PrismaService } from "src/services/prisma.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [TournamentsController],
  imports: [ConfigModule],
  providers: [TournamentsService, ConfigService, PrismaService],
})
export class TournamentsModule {}
