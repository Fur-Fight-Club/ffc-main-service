import { Injectable } from "@nestjs/common";
import { Prisma, Arena } from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class ArenaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getArena(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<Arena | null> {
    const { where } = params;
    return this.prisma.arena.findUnique({ where });
  }

  async getArenas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Arena[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.arena.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createArena(params: { data: Prisma.ArenaCreateInput }): Promise<Arena> {
    const { data } = params;

    return await this.prisma.arena.create({ data });
  }

  async updateArena(params: {
    where: Prisma.ArenaWhereUniqueInput;
    data: Prisma.ArenaUpdateInput;
  }): Promise<Arena> {
    const { where, data } = params;
    return this.prisma.arena.update({ data, where });
  }

  async deleteArena(params: {
    where: Prisma.ArenaWhereUniqueInput;
  }): Promise<Arena> {
    const { where } = params;
    return this.prisma.arena.delete({ where });
  }
}
