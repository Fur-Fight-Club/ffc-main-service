import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import {
  CreateTournamentDto,
  EndRoundDto,
  EndRoundResponse,
  JoinTournamentDto,
  JoinTournamentResponse,
  UpdateTournamentDto,
} from "./tournaments.schema";
import { Tournament } from "ffc-prisma-package/dist/client";
import { MatchService } from "src/match/match.service";

@Injectable()
export class TournamentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly matchService: MatchService
  ) {}
  create(createTournamentDto: CreateTournamentDto) {
    const { name, entry_cost, arena_id } = createTournamentDto;

    const matchData = {
      matchStartDate: new Date(),
      fk_arena: arena_id,
    };

    return this.prisma.tournament.create({
      data: {
        name,
        entry_cost,
        tournamentStartDate: null,
        Arena: {
          connect: {
            id: arena_id,
          },
        },
        Matches: {
          createMany: {
            data: [
              matchData,
              matchData,
              matchData,
              matchData,
              matchData,
              matchData,
              matchData,
            ],
          },
        },
      },
    });
  }

  async findAll(): Promise<Tournament[]> {
    return await this.prisma.tournament.findMany({
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
          orderBy: {
            id: "asc",
          },
          include: {
            Monster1: true,
            Monster2: true,
            Transaction: {
              include: {
                Wallet: {
                  include: {
                    User: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Tournament> {
    return await this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
          orderBy: {
            id: "asc",
          },
          include: {
            Monster1: true,
            Monster2: true,
            Transaction: {
              include: {
                Wallet: {
                  include: {
                    User: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateTournamentDto: UpdateTournamentDto
  ): Promise<Tournament> {
    return await this.prisma.tournament.update({
      where: {
        id,
      },
      data: {
        name: updateTournamentDto.name,
        entry_cost: updateTournamentDto.entry_cost,
        Arena: {
          connect: {
            id: updateTournamentDto.arena_id,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Tournament> {
    return await this.prisma.tournament.delete({
      where: {
        id,
      },
    });
  }

  async joinTournament(
    tournamentId: number,
    body: JoinTournamentDto
  ): Promise<JoinTournamentResponse> {
    const { monster_id } = body;
    const tournament = await this.prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
          orderBy: {
            id: "asc",
          },
          include: {
            Monster1: true,
            Monster2: true,
            Transaction: {
              include: {
                Wallet: {
                  include: {
                    User: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (tournament.Participants.find((p) => p.id === monster_id)) {
      throw new BadRequestException("Monster already in tournament");
    }

    if (tournament.Participants.length >= 8) {
      throw new BadRequestException("Tournament is full");
    }

    await this.prisma.tournament.update({
      where: {
        id: tournamentId,
      },
      data: {
        Participants: {
          connect: {
            id: monster_id,
          },
        },
      },
    });

    return { tournamentId, joined: true };
  }

  async startTournament(id: number) {
    const tournament = await this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
          orderBy: {
            id: "asc",
          },
          include: {
            Monster1: true,
            Monster2: true,
            Transaction: {
              include: {
                Wallet: {
                  include: {
                    User: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const [match1, match2, match3, match4] = tournament.Matches;

    const participants = tournament.Participants.sort(
      () => Math.random() - 0.5
    );

    await this.prisma.match.update({
      where: {
        id: match1.id,
      },
      data: {
        Monster1: {
          connect: {
            id: participants[0].id,
          },
        },
        Monster2: {
          connect: {
            id: participants[1].id,
          },
        },
      },
    });

    await this.prisma.match.update({
      where: {
        id: match2.id,
      },
      data: {
        Monster1: {
          connect: {
            id: participants[2].id,
          },
        },
        Monster2: {
          connect: {
            id: participants[3].id,
          },
        },
      },
    });

    await this.prisma.match.update({
      where: {
        id: match3.id,
      },
      data: {
        Monster1: {
          connect: {
            id: participants[4].id,
          },
        },
        Monster2: {
          connect: {
            id: participants[5].id,
          },
        },
      },
    });

    await this.prisma.match.update({
      where: {
        id: match4.id,
      },
      data: {
        Monster1: {
          connect: {
            id: participants[6].id,
          },
        },
        Monster2: {
          connect: {
            id: participants[7].id,
          },
        },
      },
    });

    await this.prisma.tournament.update({
      where: {
        id,
      },
      data: {
        tournamentStartDate: new Date(),
      },
    });

    return await this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
          orderBy: {
            id: "asc",
          },
          include: {
            Monster1: true,
            Monster2: true,
            Transaction: {
              include: {
                Wallet: {
                  include: {
                    User: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async endRound(id: number, body: EndRoundDto): Promise<EndRoundResponse> {
    const { match_id, winner_id } = body;
    const tournament = await this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
          orderBy: {
            id: "asc",
          },
          include: {
            Monster1: true,
            Monster2: true,
            Transaction: {
              include: {
                Wallet: {
                  include: {
                    User: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const match = tournament.Matches.find((m) => m.id === match_id);
    const matchIndex = tournament.Matches.findIndex((m) => m.id === match_id);

    // Check if the match is already ended
    if (match.matchEndDate) {
      throw new BadRequestException("Match already ended");
    }

    await this.matchService.closeMatch({ id: match_id }, { winner: winner_id });

    // Get the next round
    const nextRound = this.determineNextRound(matchIndex);

    // If there is no next round, the tournament is over
    if (nextRound === -1) {
      await this.prisma.tournament.update({
        where: {
          id,
        },
        data: {
          tournamentEndDate: new Date(),
          winner: {
            connect: {
              id: winner_id,
            },
          },
        },
      });
      return {
        endDate: new Date(),
        winner: winner_id,
      };
    }

    const nextMatch = tournament.Matches[nextRound];

    // Check if the next match is already filled
    if (nextMatch.Monster1 && nextMatch.Monster2) {
      throw new BadRequestException("Next match already filled");
    }

    // Send the winner to the next match
    if (nextMatch.Monster1) {
      await this.prisma.match.update({
        where: {
          id: nextMatch.id,
        },
        data: {
          Monster2: {
            connect: {
              id: winner_id,
            },
          },
        },
      });
    } else {
      await this.prisma.match.update({
        where: {
          id: nextMatch.id,
        },
        data: {
          Monster1: {
            connect: {
              id: winner_id,
            },
          },
        },
      });
    }

    return {
      endDate: new Date(),
      winner: winner_id,
      nextMatch: nextMatch,
    };
  }

  private determineNextRound(matchIndex: number) {
    switch (matchIndex) {
      // Match 1 or 3
      case 0:
      case 2:
        return 4;
      // Match 2 or 4
      case 1:
      case 3:
        return 5;
      // Match 5 or 6
      case 4:
      case 5:
        return 6;
      default:
        return -1;
    }
  }
}
