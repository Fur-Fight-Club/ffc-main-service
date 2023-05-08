import {
  Body,
  Controller,
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

  // Créer un match avec des règles
  @Post("create")
  async create(@Body(ZodValidationPipe) data: CreateMatchDto) {
    return this.matchService.createMatch(data);
  }

  // Rejoindre -> waitinglist avant validation
  @Patch("join/:id")
  async joinWaitingList(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: CreateMatchWaitingListDto
  ) {
    return this.matchService.joinWaitingListMatch({ ...data, id: +id });
  }

  //valider le mec qui veux rejoindre le match
  @Patch("join/validate/:id")
  async validateWaitingList(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: ValidateMatchWaitingListControllerDto
  ) {
    return this.matchService.validateWaitingListMatch({ ...data, id: +id });
  }

  // Valider un match

  // Fermer un match
  //-> Changer le MMR des Monsters

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
