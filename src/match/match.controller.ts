import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import {
  CreateMatchDto,
  CreateMatchWaitingListDto,
  GetMatchDto,
  ValidateMatchWaitingListControllerDto,
} from "./match.schema";
import { MatchService } from "./match.service";

@Controller("match")
// @UseGuards(UserGuard)
@ApiTags("Match Controller")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async getAll() {
    return this.matchService.getMatches();
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: GetMatchDto) {
    return this.matchService.getMatch({ id: +id });
  }

  @Post("create")
  async create(@Body(ZodValidationPipe) data: CreateMatchDto) {
    return this.matchService.createMatch(data);
  }

  @Patch("join/:id")
  async joinWaitingList(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: CreateMatchWaitingListDto
  ) {
    return this.matchService.joinWaitingListMatch({ ...data, id: +id });
  }

  @Patch("join/validate/:id")
  async validateWaitingList(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: ValidateMatchWaitingListControllerDto
  ) {
    return this.matchService.validateWaitingListMatch({ ...data, id: +id });
  }

  @Patch("join/reject/:id")
  async rejectWaitingListMatch(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: ValidateMatchWaitingListControllerDto
  ) {
    return this.matchService.rejectWaitingListMatch({ ...data, id: +id });
  }

  // Fermer un match
  //-> Ajoute le matchEndedAt
  //-> Changer le MMR des Monsters
  @Patch("close/:id")
  async closeMatch(@Param("id", ParseIntPipe) id: GetMatchDto) {
    return this.matchService.closeMatch({ id: +id });
  }

  //Permet d'envoyer des messages à l'intérieur du Loby d'un match
  // @Post(":id/message")
  // @UseGuards(UserGuard)
  // @ApiBody({
  //   description: "Send a message to a match",
  //   type: CreateMessageApiBody,
  // })
  // @ApiParam({
  //   name: "id",
  //   description: "Match id",
  //   type: "number",
  // })
  // sendMessage(
  //   @Body(ZodValidationPipe) body: CreateMessageDto,
  //   @Request() request: JWTUserRequest,
  //   @Param("id") id: number
  // ) {
  //   return this.matchService.sendMessage(request.user.sub, id, body.message);
  // }
}
