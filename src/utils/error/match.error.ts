import { Injectable } from "@nestjs/common";
import { MatchRepository } from "src/match/match.repository";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class MatchError {
  constructor(
    private matchRepository: MatchRepository,
    private monsterRepository: MonsterRepository,
    private readonly prisma: PrismaService
  ) {}

  private getMatch = (matchId: number) => {
    return this.matchRepository.getMatch({ where: { id: matchId } });
  };

  private getMonster = async (monsterId: number) => {
    return await this.monsterRepository.getMonster({
      where: { id: monsterId },
    });
  };

  checkIfMatchExists = async (matchId: number) => {
    const match = this.getMatch(matchId);
    if (match === null) {
      throw new Error(`Match not found or doesn't exist`);
    }
  };

  checkIfMonsterExists = async (monsterId: number) => {
    const monster = this.getMonster(monsterId);
    if (monster === null) {
      throw new Error(`Monster not found or doesn't exist`);
    }
  };

  checkIfMonsterIsNotInTheWaitingListOfTheMatch = async (
    matchId: number,
    monsterId: number
  ) => {
    const currentWaitingList = await this.matchRepository.getMatchWaitingList({
      where: {
        Match: {
          id: matchId,
        },
        Monster: {
          id: monsterId,
        },
      },
    });
    if (currentWaitingList.length > 0) {
      throw new Error(`Monster is already in the waiting list of the match`);
    }
  };
}
