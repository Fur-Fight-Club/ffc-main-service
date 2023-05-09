import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { handleMatchMessageError } from "src/utils/error/match.error";
import { parseToZodObject } from "src/utils/match.utils";
import { MatchRepository } from "./match.repository";
import {
  CloseMatchDto,
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
    try {
      const matches = await this.matchRepository.getMatches({});
      return matches.map((match) => parseToZodObject(match));
    } catch (error) {
      throw error;
    }
  }

  async getMatch(params: GetMatchDto): Promise<MatchInterface> {
    try {
      const { id } = params;
      const match = await this.matchRepository.getMatch({ where: { id } });

      if (match === null) {
        throw new Error(`Match not found or doesn't exist`);
      }

      return parseToZodObject(match);
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async createMatch(params: CreateMatchDto): Promise<MatchInterface> {
    try {
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

      return parseToZodObject(match);
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async joinWaitingListMatch(
    params: JoinMatchWaitingListDto
  ): Promise<MatchInterface> {
    try {
      const { id, monster } = params;

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
      handleMatchMessageError(error);
    }
  }

  async validateWaitingListMatch(
    params: ValidateMatchWaitingListServiceDto
  ): Promise<MatchInterface> {
    try {
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
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async rejectWaitingListMatch(
    params: ValidateMatchWaitingListServiceDto
  ): Promise<MatchInterface> {
    try {
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
        throw new Error(`Monster is already rejected in the match`);
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
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async updateMatch(params: UpdateMatchDto): Promise<MatchInterface> {
    try {
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
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async deleteMatch(params: DeleteMatchDto): Promise<MatchInterface> {
    try {
      const { id } = params;
      const match = await this.matchRepository.deleteMatch({ where: { id } });
      return parseToZodObject(match);
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async closeMatch(params: CloseMatchDto): Promise<MatchInterface> {
    try {
      const { id } = params;

      await this.checkIfMatchIsNotAlreadyClosed(id);

      const match = await this.matchRepository.updateMatch({
        where: {
          id,
        },
        data: {
          matchEndDate: new Date(),
        },
      });

      return parseToZodObject(match);
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async sendMessage(sender: number, match: number, message: string) {
    return this.matchMessageApi.sendMessage(sender, match, message);
  }

  private checkIfMonsterIsNotTheSameOnMatch = async (
    matchId: number,
    monsterId: number
  ) => {
    try {
      const match = await this.matchRepository.getMatch({
        where: { id: matchId },
      });
      if (match?.fk_monster_1 === monsterId) {
        throw new ConflictException(
          `Is actually the same monster in the match`
        );
      }
    } catch (error) {
      throw error;
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

  private checkIfMatchIsNotAlreadyClosed = async (matchId: number) => {
    try {
      const match = await this.matchRepository.getMatch({
        where: { id: matchId },
      });
      if (match?.matchEndDate !== null) {
        throw new ConflictException(`Match is already closed`);
      }
    } catch (error) {
      throw error;
    }
  };
}
