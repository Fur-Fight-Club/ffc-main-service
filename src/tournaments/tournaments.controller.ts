import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import {
  CreateTournamentDto,
  EndRoundDto,
  JoinTournamentDto,
  UpdateTournamentDto,
} from "./tournaments.schema";
import { ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import { UserGuard } from "src/auth/auth-user.guard";

@Controller("tournaments")
@UseGuards(UserGuard)
@ApiTags("Tournaments controller")
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(@Body(ZodValidationPipe) createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(ZodValidationPipe) updateTournamentDto: UpdateTournamentDto
  ) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tournamentsService.remove(+id);
  }

  @Post(":id/join")
  joinTournament(
    @Param("id") id: string,
    @Body(ZodValidationPipe) body: JoinTournamentDto
  ) {
    return this.tournamentsService.joinTournament(+id, body);
  }

  @Get(":id/start")
  startTournament(@Param("id") id: string) {
    return this.tournamentsService.startTournament(+id);
  }

  @Post(":id/round/end")
  endRound(
    @Param("id") id: string,
    @Body(ZodValidationPipe) body: EndRoundDto
  ) {
    return this.tournamentsService.endRound(+id, body);
  }
}
