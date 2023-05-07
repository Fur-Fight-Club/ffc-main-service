import { Injectable } from "@nestjs/common";
import { Prisma, Monster } from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class MonsterRepository {
  constructor(private prisma: PrismaService) {}

  async getMonster(params: {
    where: Prisma.MonsterWhereUniqueInput;
  }): Promise<Monster | null> {
    const { where } = params;
    return this.prisma.monster.findUnique({ where });
  }

  async getMonsters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MonsterWhereUniqueInput;
    where?: Prisma.MonsterWhereInput;
    orderBy?: Prisma.MonsterOrderByWithRelationInput;
  }): Promise<Monster[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.monster.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMonster(params: {
    data: Prisma.MonsterUncheckedCreateInput;
  }): Promise<Monster> {
    const { data } = params;
    const { ...result } = await this.prisma.monster.create({ data });
    return result;
  }

  async updateMonster(params: {
    where: Prisma.MonsterWhereUniqueInput;
    data: Prisma.MonsterUpdateInput;
  }): Promise<Monster> {
    const { where, data } = params;
    return this.prisma.monster.update({ data, where });
  }

  async deleteMonster(params: {
    where: Prisma.MonsterWhereUniqueInput;
  }): Promise<Monster> {
    const { where } = params;
    return this.prisma.monster.delete({ where });
  }
}
