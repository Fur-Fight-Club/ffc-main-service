import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import {
  CreateMessageApiBody,
  CreateMessageDto,
} from "src/api/notifications/match-message/match-message.interface";
import { UserGuard } from "src/auth/auth-user.guard";
import { JWTUserRequest } from "src/auth/auth.model";
import { CreateMatchDto } from "./match.schema";
import { MatchService } from "./match.service";

@Controller("match")
@ApiTags("Match Controller")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  // Créer un match avec des règles
  @Post("create")
  @UseGuards(UserGuard)
  async create(@Body(ZodValidationPipe) data: CreateMatchDto) {
    return this.matchService.createMatch(data);
  }

  // Rejoindre un match

  // Valider un match

  // Fermer un match

  //Permet d'envoyer des messages à l'intérieur du Loby d'un match
  @Post(":id/message")
  @UseGuards(UserGuard)
  @ApiBody({
    description: "Send a message to a match",
    type: CreateMessageApiBody,
  })
  @ApiParam({
    name: "id",
    description: "Match id",
    type: "number",
  })
  sendMessage(
    @Body(ZodValidationPipe) body: CreateMessageDto,
    @Request() request: JWTUserRequest,
    @Param("id") id: number
  ) {
    return this.matchService.sendMessage(request.user.sub, id, body.message);
  }
}
