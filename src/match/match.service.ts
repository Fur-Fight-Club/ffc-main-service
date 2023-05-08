import { Inject, Injectable } from "@nestjs/common";
import { Match } from "ffc-prisma-package/dist/client";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { MatchRepository } from "./match.repository";
import {
  CreateMatchDto,
  CreateMatchWaitingListDto,
  DeleteMatchDto,
  GetMatchDto,
  MatchInterface,
  UpdateMatchDto,
  ValidateMatchWaitingListDto,
} from "./match.schema";

@Injectable()
export class MatchService {
  constructor(
    @Inject(MatchMessageApi) private matchMessageApi: MatchMessageApi,
    private matchRepository: MatchRepository,
    private monsterRepository: MonsterRepository,
    private readonly prisma: PrismaService
  ) {}

  async createMatch(params: CreateMatchDto): Promise<MatchInterface> {
    const {
      fk_arena,
      weight_category,
      matchStartDate: startDate,
      monster1,
    } = params;

    const match = await this.matchRepository.createMatch({
      data: {
        weight_category,
        matchStartDate: new Date(startDate),
        Monster1: {
          connect: {
            id: monster1,
          },
        },
        Arena: {
          connect: {
            id: fk_arena,
          },
        },
      },
    });

    return this.parseToZodObject(match);
  }

  async joinWaitingListMatch(
    params: CreateMatchWaitingListDto
  ): Promise<MatchInterface> {
    const { id, monster } = params;

    const match = await this.matchRepository.updateMatch({
      where: { id: id },
      data: {
        MatchWaitingList: {
          create: {
            Monster: {
              connect: {
                id: monster,
              },
            },
          },
        },
      },
    });

    return this.parseToZodObject(match);
  }

  async validateWaitingListMatch(
    params: ValidateMatchWaitingListDto
  ): Promise<MatchInterface> {
    const { id, monster } = params;

    //find the match waiting list id
    const matchWaitingListId =
      await this.matchRepository.findMatchWaitingListIDWithOneMonsterID({
        where: {
          Match: {
            id,
          },
          Monster: {
            id: monster,
          },
        },
      });

    //update the match waiting list status
    await this.matchRepository.updateMatch({
      where: { id: id },
      data: {
        MatchWaitingList: {
          update: {
            where: {
              id: matchWaitingListId.id,
            },
            data: {
              status: `ACCEPTED`,
            },
          },
        },
      },
    });

    //join the match
    const match = await this.matchRepository.updateMatch({
      where: { id: id },
      data: {
        Monster2: {
          connect: {
            id: monster,
          },
        },
      },
    });

    return this.parseToZodObject(match);
  }

  async getMatches(): Promise<MatchInterface[]> {
    const matches = await this.matchRepository.getMatches({});
    return matches.map((match) => this.parseToZodObject(match));
  }

  async getMatch(params: GetMatchDto): Promise<MatchInterface> {
    const { id } = params;
    return this.parseToZodObject(
      await this.matchRepository.getMatch({ where: { id } })
    );
  }

  async updateMatch(params: UpdateMatchDto): Promise<MatchInterface> {
    const {
      id,
      fk_arena,
      weight_category,
      matchStartDate,
      monster1,
      monster2,
    } = params;
    const match = await this.matchRepository.updateMatch({
      where: {
        id,
      },
      data: {
        weight_category,
        matchStartDate,
        Monster1: {
          connect: {
            id: monster1,
          },
        },
        Monster2: {
          connect: {
            id: monster2,
          },
        },
        Arena: {
          connect: {
            id: fk_arena,
          },
        },
      },
    });

    return this.parseToZodObject(match);
  }

  async deleteMatch(params: DeleteMatchDto): Promise<MatchInterface> {
    const { id } = params;
    return this.parseToZodObject(
      await this.matchRepository.deleteMatch({ where: { id } })
    );
  }

  async sendMessage(sender: number, match: number, message: string) {
    return this.matchMessageApi.sendMessage(sender, match, message);
  }

  private parseToZodObject(match: Match) {
    const { matchStartDate, matchEndDate, ...matchObject } = match;
    return {
      ...matchObject,
      matchStartDate: matchStartDate?.toISOString(),
      matchEndDate: matchEndDate?.toISOString(),
    };
  }
}
