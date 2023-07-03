import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CreateTournamentDto, UpdateTournamentDto } from "./tournaments.schema";

@Injectable()
export class TournamentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTournamentDto: CreateTournamentDto) {
    const { name, entry_cost, arena_id, start_date } = createTournamentDto;

    const matchData = {
      matchStartDate: start_date,
      fk_arena: arena_id,
    };

    return this.prisma.tournament.create({
      data: {
        name,
        entry_cost,
        tournamentStartDate: start_date,
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

  async findAll() {
    return await this.prisma.tournament.findMany({
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
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

  async findOne(id: number) {
    return await this.prisma.tournament.findUnique({
      where: {
        id,
      },
      include: {
        Arena: true,
        winner: true,
        Participants: true,
        Matches: {
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

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return await this.prisma.tournament.update({
      where: {
        id,
      },
      data: {
        name: updateTournamentDto.name,
        entry_cost: updateTournamentDto.entry_cost,
        tournamentStartDate: updateTournamentDto.start_date,
        Arena: {
          connect: {
            id: updateTournamentDto.arena_id,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.tournament.delete({
      where: {
        id,
      },
    });
  }
}
