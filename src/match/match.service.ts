import { Inject, Injectable } from "@nestjs/common";
import { Match } from "ffc-prisma-package/dist/client";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { MatchRepository } from "./match.repository";
import {
  CreateMatchDto,
  DeleteMatchDto,
  GetMatchDto,
  JoinMatchWaitingListDto,
  MatchInterface,
  UpdateMatchDto,
  ValidateMatchWaitingListServiceDto,
} from "./match.schema";

@Injectable()
export class MatchService {
  constructor(
    @Inject(MatchMessageApi) private matchMessageApi: MatchMessageApi,
    private matchRepository: MatchRepository,
    private monsterRepository: MonsterRepository,
    private readonly prisma: PrismaService
  ) {}

  async getMatches(): Promise<MatchInterface[]> {
    const matches = await this.matchRepository.getMatches({});
    return matches.map((match) => this.parseToZodObject(match));
  }

  async getMatch(params: GetMatchDto): Promise<MatchInterface> {
    const { id } = params;
    const match = await this.matchRepository.getMatch({ where: { id } });

    if (match === null) {
      throw new Error(`Match not found or doesn't exist`);
    }

    return this.parseToZodObject(match);
  }

  async createMatch(params: CreateMatchDto): Promise<MatchInterface> {
    const {
      fk_arena,
      weight_category,
      matchStartDate: startDate,
      monster1,
    } = params;

    //check if the monster exists
    const monsterObject = await this.monsterRepository.getMonster({
      where: { id: monster1 },
    });
    if (monsterObject === null) {
      throw new Error(`Monster not found or doesn't exist`);
    }

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
    params: JoinMatchWaitingListDto
  ): Promise<MatchInterface> {
    const { id, monster } = params;

    //check if the monster exists
    const monsterObject = await this.monsterRepository.getMonster({
      where: { id: monster },
    });
    if (monsterObject === null) {
      throw new Error(`Monster not found or doesn't exist`);
    }

    //check if the match exists
    const matchObject = await this.matchRepository.getMatch({
      where: { id },
    });
    if (matchObject === null) {
      throw new Error(`Match not found or doesn't exist`);
    }

    //check if the monster is not the same as the monster1
    if (matchObject?.fk_monster_1 === monster) {
      throw new Error(`Is actually the same monster in the match`);
    }

    // check if the monster is not already in the waiting list of the match
    const currentWaitingList = await this.matchRepository.getMatchWaitingList({
      where: {
        Match: {
          id,
        },
        Monster: {
          id: monster,
        },
      },
    });
    if (currentWaitingList.length > 0) {
      throw new Error(`Monster is already in the waiting list of the match`);
    }

    console.log("🔨 matchObject", matchObject);
    console.log("🤡 currentWaitingList", currentWaitingList);

    const match = await this.matchRepository.updateMatch({
      where: { id },
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
    params: ValidateMatchWaitingListServiceDto
  ): Promise<MatchInterface> {
    const { id, monster } = params;

    //check if the monster exists
    const monsterObject = await this.monsterRepository.getMonster({
      where: { id: monster },
    });
    if (monsterObject === null) {
      throw new Error(`Monster not found or doesn't exist`);
    }
    // check if the match exists
    const matchObject = await this.matchRepository.getMatch({
      where: { id },
    });
    if (matchObject === null) {
      throw new Error(`Match not found or doesn't exist`);
    }

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

    if (matchWaitingListId === null) {
      throw new Error(`Monster is not in the queue or match doesn't exist`);
    }
    if (matchWaitingListId.status === `ACCEPTED`) {
      throw new Error(`Monster is already accepted in the match`);
    }

    //update the match waiting list status
    const updateMatch = await this.matchRepository.updateMatch({
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

  async rejectWaitingListMatch(
    params: ValidateMatchWaitingListServiceDto
  ): Promise<MatchInterface> {
    const { id, monster } = params;

    //check if the monster exists
    const monsterObject = await this.monsterRepository.getMonster({
      where: { id: monster },
    });
    if (monsterObject === null) {
      throw new Error(`Monster not found or doesn't exist`);
    }
    // check if the match exists
    const matchObject = await this.matchRepository.getMatch({
      where: { id },
    });
    if (matchObject === null) {
      throw new Error(`Match not found or doesn't exist`);
    }

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

    if (matchWaitingListId === null) {
      throw new Error(`Monster is not in the queue or match doesn't exist`);
    }
    if (matchWaitingListId.status === `ACCEPTED`) {
      throw new Error(`Monster is already accepted in the match`);
    }

    //update the match waiting list status
    const updateMatch = await this.matchRepository.updateMatch({
      where: { id: id },
      data: {
        MatchWaitingList: {
          update: {
            where: {
              id: matchWaitingListId.id,
            },
            data: {
              status: `REJECTED`,
            },
          },
        },
      },
    });

    return this.parseToZodObject(updateMatch);
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
