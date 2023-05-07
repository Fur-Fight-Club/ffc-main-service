import { Injectable } from "@nestjs/common";
import { Match, Prisma } from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class MatchRepository {
  constructor(private prisma: PrismaService) {}

  async createMatch(params: { data: Prisma.MatchCreateInput }): Promise<Match> {
    const { data } = params;
    return this.prisma.match.create({ data });
  }
}
