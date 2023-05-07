import { Inject, Injectable } from "@nestjs/common";
import { Monster } from "ffc-prisma-package/dist/client";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";
import { MatchRepository } from "./match.repository";
import { CreateMatchDto, MatchInterface } from "./match.schema";

@Injectable()
export class MatchService {
  constructor(
    @Inject(MatchMessageApi) private matchMessageApi: MatchMessageApi,
    private repository: MatchRepository
  ) {}

  async createMatch(params: CreateMatchDto): Promise<MatchInterface> {
    const { arenaId, weight_category, matchStartDate } = params;

    // Get monster by id
    const monster: Monster = [] as unknown as Monster;

    // Compute monster odds or set it to default value
    const odds = 1;

    return this.repository.createMatch({
      data: {
        arenaId,
        weight_category,
        matchStartDate,
        Fighter1: {
          create: {
            odds,
            // Monster Prisma object
            fk_monster: monster,
          },
        },
      },
    });
  }

  async sendMessage(sender: number, match: number, message: string) {
    return this.matchMessageApi.sendMessage(sender, match, message);
  }
}
