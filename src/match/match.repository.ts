import { Injectable } from "@nestjs/common";
import {
  Match,
  MatchWaitingList,
  Prisma,
} from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class MatchRepository {
  constructor(private prisma: PrismaService) {}

  async getMatch(params: {
    where: Prisma.MatchWhereUniqueInput;
  }): Promise<Match | null> {
    const { where } = params;
    return this.prisma.match.findUnique({
      where,
      include: {
        Monster1: true,
        Monster2: true,
        Arena: true,
        MatchMessage: true,
      },
    });
  }

  async getMatches(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MatchWhereUniqueInput;
    where?: Prisma.MatchWhereInput;
    orderBy?: Prisma.MatchOrderByWithRelationInput;
  }): Promise<Match[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.match.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        Monster1: true,
        Monster2: true,
        Arena: true,
        MatchMessage: true,
        Transaction: {
          select: {
            Wallet: {
              select: {
                User: {
                  select: {
                    firstname: true,
                    lastname: true,
                  },
                },
              },
            },
            amount: true,
            Monster: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async createMatch(params: { data: Prisma.MatchCreateInput }): Promise<Match> {
    const { data } = params;
    return this.prisma.match.create({ data });
  }

  async updateMatch(params: {
    where: Prisma.MatchWhereUniqueInput;
    data: Prisma.MatchUpdateInput;
  }): Promise<Match> {
    const { where, data } = params;
    return this.prisma.match.update({ data, where });
  }

  async deleteMatch(params: {
    where: Prisma.MatchWhereUniqueInput;
  }): Promise<Match> {
    const { where } = params;
    return this.prisma.match.delete({ where });
  }

  // async getMatchWaitingList(params: {
  //   where: Prisma.MatchWaitingListWhereUniqueInput;
  // }): Promise<MatchWaitingList | null> {
  //   const { where } = params;
  //   return this.prisma.matchWaitingList.findUnique({
  //     where,
  //   });
  // }

  //get waitingList of a match
  async getMatchWaitingList(params: {
    where: Prisma.MatchWaitingListWhereInput;
  }): Promise<MatchWaitingList[]> {
    const { where } = params;
    return this.prisma.matchWaitingList.findMany({
      where,
    });
  }

  async createMatchWaitingList(params: {
    data: Prisma.MatchWaitingListCreateInput;
  }): Promise<MatchWaitingList> {
    const { data } = params;
    return this.prisma.matchWaitingList.create({ data });
  }

  async updateMatchWaitingList(params: {
    where: Prisma.MatchWaitingListWhereUniqueInput;
    data: Prisma.MatchWaitingListUpdateInput;
  }): Promise<MatchWaitingList> {
    const { where, data } = params;
    return this.prisma.matchWaitingList.update({ data, where });
  }

  async deleteMatchWaitingList(params: {
    where: Prisma.MatchWaitingListWhereUniqueInput;
  }): Promise<MatchWaitingList> {
    const { where } = params;
    return this.prisma.matchWaitingList.delete({ where });
  }

  async findMatchWaitingListIDWithOneMonsterID(params: {
    where: Prisma.MatchWaitingListWhereInput;
  }): Promise<MatchWaitingList | null> {
    const { where } = params;
    return this.prisma.matchWaitingList.findFirst({ where });
  }
}
