import { Inject, Injectable } from "@nestjs/common";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { parseToZodObject } from "src/utils/match.utils";
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
    return matches.map((match) => parseToZodObject(match));
  }

  async getMatch(params: GetMatchDto): Promise<MatchInterface> {
    const { id } = params;
    const match = await this.matchRepository.getMatch({ where: { id } });

    if (match === null) {
      throw new Error(`Match not found or doesn't exist`);
    }

    return parseToZodObject(match);
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

    return parseToZodObject(match);
  }

  async joinWaitingListMatch(
    params: JoinMatchWaitingListDto
  ): Promise<MatchInterface> {
    try {
      const { id, monster } = params;

      // this.matchError.checkIfMatchExists(id);
      // this.matchError.checkIfMonsterExists(monster);
      await this.checkIfMonsterIsNotTheSameOnMatch(id, monster);
      await this.checkIfMonsterIsNotInTheWaitingListOfTheMatch(id, monster);

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

      return parseToZodObject(match);
    } catch (error) {
      throw error;
    }
  }

  async validateWaitingListMatch(
    params: ValidateMatchWaitingListServiceDto
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

    return parseToZodObject(match);
  }

  async rejectWaitingListMatch(
    params: ValidateMatchWaitingListServiceDto
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

    return parseToZodObject(updateMatch);
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

    return parseToZodObject(match);
  }

  async deleteMatch(params: DeleteMatchDto): Promise<MatchInterface> {
    const { id } = params;
    return parseToZodObject(
      await this.matchRepository.deleteMatch({ where: { id } })
    );
  }

  async sendMessage(sender: number, match: number, message: string) {
    return this.matchMessageApi.sendMessage(sender, match, message);
  }

  private checkIfMonsterIsNotTheSameOnMatch = async (
    matchId: number,
    monsterId: number
  ) => {
    const match = await this.matchRepository.getMatch({
      where: { id: matchId },
    });
    if (match?.fk_monster_1 === monsterId) {
      throw new Error(`Is actually the same monster in the match`);
    }
  };

  private checkIfMonsterIsNotInTheWaitingListOfTheMatch = async (
    matchId: number,
    monsterId: number
  ) => {
    try {
      const currentWaitingList = await this.matchRepository.getMatchWaitingList(
        {
          where: {
            Match: {
              id: matchId,
            },
            Monster: {
              id: monsterId,
            },
          },
        }
      );
      if (currentWaitingList.length > 0) {
        throw new Error(`Monster is already in the waiting list of the match`);
      }
    } catch (error) {
      throw error;
    }
  };
}
