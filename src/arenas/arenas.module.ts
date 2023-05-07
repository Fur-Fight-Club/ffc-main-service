import { Module } from "@nestjs/common";
import { ArenasService } from "./arenas.service";
import { ArenasController } from "./arenas.controller";
import { PrismaService } from "src/services/prisma.service";
import { ArenaRepository } from "./arena.repository";

@Module({
  controllers: [ArenasController],
  providers: [ArenasService, PrismaService, ArenaRepository],
})
export class ArenasModule {}
