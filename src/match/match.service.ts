import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";
import { MonsterRepository } from "src/monster/monster.repository";
import { PrismaService } from "src/services/prisma.service";
import { handleMatchMessageError } from "src/utils/error/match.error";
import { parseToZodObject } from "src/utils/match.utils";
import { MatchRepository } from "./match.repository";
import {
  CloseMatchBodyDto,
  CloseMatchDto,
  CreateMatchBetDto,
  CreateMatchDto,
  DeleteMatchDto,
  GetMatchDto,
  JoinMatchWaitingListDto,
  MatchInterface,
  UpdateMatchDto,
  ValidateMatchWaitingListServiceDto,
} from "./match.schema";
import { WalletApi } from "src/api/payments/wallet/wallet.schema";
import {
  TransactionTag,
  TransactionType,
} from "ffc-prisma-package/dist/client";
import { uuid } from "uuidv4";
import { connect } from "http2";
import { MatchGateway } from "./match.gateway";

@Injectable()
export class MatchService {
  constructor(
    @Inject(MatchMessageApi) private matchMessageApi: MatchMessageApi,
    private matchRepository: MatchRepository,
    private monsterRepository: MonsterRepository,
    private readonly prisma: PrismaService,
    private matchGateway: MatchGateway,
    @Inject(WalletApi) private walletApi: WalletApi
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

  async closeMatch(
    params: CloseMatchDto,
    body: CloseMatchBodyDto
  ): Promise<MatchInterface> {
    try {
      const { id } = params;

      await this.checkIfMatchIsNotAlreadyClosed(id);

      const match = await this.matchRepository.updateMatch({
        where: {
          id,
        },
        data: {
          matchEndDate: new Date(),
          winner: {
            connect: {
              id: body.winner,
            },
          },
        },
      });

      const currentMatch = await this.matchRepository.getMatch({
        where: {
          id,
        },
      });

      const winner = await this.prisma.monster.findUnique({
        where: {
          id: body.winner,
        },
      });

      const loserId =
        body.winner === match.fk_monster_1
          ? match.fk_monster_2
          : match.fk_monster_1;

      const loser = await this.prisma.monster.findUnique({
        where: {
          id: loserId,
        },
      });

      // Calculate mmr gain/loss
      const winnerMmrGain = loser.mmr * 0.1;
      const loserMmrLoss = winner.mmr * 0.1 + loser.mmr * 0.1;

      // Update winner mmr
      await this.prisma.monster.update({
        where: {
          id: body.winner,
        },
        data: {
          mmr: winner.mmr + winnerMmrGain,
        },
      });

      // Update loser mmr
      await this.prisma.monster.update({
        where: {
          id: loserId,
        },
        data: {
          mmr: loser.mmr - loserMmrLoss,
        },
      });

      // Remove entry cost from loser
      await this.prisma.wallet.update({
        where: {
          fk_user: loser.fk_user,
        },
        data: {
          amount: {
            decrement: match.entry_cost,
          },
        },
      });

      // Add entry cost to winner
      await this.prisma.wallet.update({
        where: {
          fk_user: winner.fk_user,
        },
        data: {
          amount: {
            increment: match.entry_cost * 2,
          },
        },
      });

      // Get all bets
      const winnerBets = currentMatch.Transaction.filter(
        (transaction) => transaction.monsterId === winner.id
      );

      const loserBets = currentMatch.Transaction.filter(
        (transaction) => transaction.monsterId === loser.id
      );

      // Ratio and total bets
      const winnerRatio = winnerBets.length / loserBets.length;
      const totalBetsAmount =
        winnerBets
          .map((transaction) => transaction.amount)
          .reduce((a, b) => a + b, 0) +
        loserBets
          .map((transaction) => transaction.amount)
          .reduce((a, b) => a + b, 0);

      // Get all unique bettors from winnerBets
      const bettorsWallet = [
        ...new Set(winnerBets.map((transaction) => transaction.walletId)),
      ];

      // Recredit bettors
      await this.prisma.wallet.updateMany({
        where: {
          id: {
            in: bettorsWallet,
          },
        },
        data: {
          amount: {
            increment: totalBetsAmount * winnerRatio,
          },
        },
      });

      // Create a transaction for each bettor
      await this.prisma.transaction.createMany({
        data: bettorsWallet.map((walletId) => ({
          amount: totalBetsAmount * winnerRatio,
          walletId,
          tag: "BET",
          type: "OUT",
        })),
      });

      this.matchGateway.sendMessageToClient({ update: true });

      return parseToZodObject(match);
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async sendMessage(sender: number, match: number, message: string) {
    const messageRes = await this.matchMessageApi.sendMessage(
      sender,
      match,
      message
    );
    this.matchGateway.sendMessageToClient({ update: true });

    return messageRes;
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

  async placeBet(userId: number, matchId: number, body: CreateMatchBetDto) {
    const wallet = await this.walletApi.getBalance(userId);
    if (body.amount < 100) {
      throw new BadRequestException(`Minimum bet is 100 credits`);
    }
    if (wallet.credits < body.amount) {
      throw new BadRequestException(`You don't have enough credits`);
    }

    const newBalance = wallet.credits - body.amount;

    await this.walletApi.updateUsersWalletBalance(userId, newBalance);

    const userWallet = await this.prisma.wallet.findFirst({
      where: {
        User: {
          id: userId,
        },
      },
    });

    const matchBet = await this.prisma.transaction.create({
      data: {
        amount: body.amount,
        Match: {
          connect: {
            id: matchId,
          },
        },
        Wallet: {
          connect: {
            id: userWallet.id,
          },
        },
        Monster: {
          connect: {
            id: body.monster,
          },
        },
        tag: TransactionTag.BET,
        type: TransactionType.IN,
        Invoice: {
          create: {
            amount: +body.amount.toFixed(0),
            url: "",
            uuid: uuid(),
            User: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
    });
    this.matchGateway.sendMessageToClient({ update: true });

    return matchBet;
  }
}
