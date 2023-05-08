import { Inject, Injectable } from "@nestjs/common";
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
    const { fk_arena, weight_category, matchStartDate, monster1 } = params;

    const monster = await this.monsterRepository.getMonster({
      where: { id: monster1 },
    });

    //TODO: replace w/ repository
    const arena = await this.prisma.arena.findUnique({
      where: { id: fk_arena },
    });

    return this.matchRepository.createMatch({
      data: {
        weight_category,
        matchStartDate,
        Monster1: {
          connect: monster,
        },
        Arena: {
          connect: arena,
        },
      },
    });
  }

  async joinWaitingListMatch(
    params: CreateMatchWaitingListDto
  ): Promise<MatchInterface> {
    const { id, monster } = params;

    return this.matchRepository.updateMatch({
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
    return this.matchRepository.updateMatch({
      where: { id: id },
      data: {
        Monster2: {
          connect: {
            id: monster,
          },
        },
      },
    });
  }

  async getMatches(): Promise<MatchInterface[]> {
    return this.matchRepository.getMatches({});
  }

  async getMatch(params: GetMatchDto): Promise<MatchInterface> {
    const { id } = params;
    return this.matchRepository.getMatch({ where: { id } });
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

    return match;
  }

  async deleteMatch(params: DeleteMatchDto): Promise<MatchInterface> {
    const { id } = params;
    return this.matchRepository.deleteMatch({ where: { id } });
  }

  async sendMessage(sender: number, match: number, message: string) {
    return this.matchMessageApi.sendMessage(sender, match, message);
  }
}
