import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import {
  CloseMatchBodyDto,
  CreateMatchBetDto,
  CreateMatchDto,
  CreateMatchWaitingListDto,
  GetMatchDto,
  ValidateMatchWaitingListControllerDto,
} from "./match.schema";
import { MatchService } from "./match.service";
import { Transaction } from "ffc-prisma-package/dist/client";

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
  @ApiParam({ name: "id", description: "Match id", type: Number })
  async getOne(@Param("id", ParseIntPipe) id: GetMatchDto) {
    return this.matchService.getMatch({ id: +id });
  }

  @Post("create")
  async create(@Body(ZodValidationPipe) data: CreateMatchDto) {
    return this.matchService.createMatch(data);
  }

  @Patch("join/:id")
  @ApiParam({ name: "id", description: "Match id", type: Number })
  async joinWaitingList(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: CreateMatchWaitingListDto
  ) {
    return this.matchService.joinWaitingListMatch({ ...data, id: +id });
  }

  @Patch("join/validate/:id")
  @ApiParam({ name: "id", description: "Match id", type: Number })
  async validateWaitingList(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: ValidateMatchWaitingListControllerDto
  ) {
    return this.matchService.validateWaitingListMatch({ ...data, id: +id });
  }

  @Patch("join/reject/:id")
  @ApiParam({ name: "id", description: "Match id", type: Number })
  async rejectWaitingListMatch(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: ValidateMatchWaitingListControllerDto
  ) {
    return this.matchService.rejectWaitingListMatch({ ...data, id: +id });
  }

  @Patch("close/:id")
  @ApiParam({ name: "id", description: "Match id", type: Number })
  async closeMatch(
    @Param("id", ParseIntPipe) id: GetMatchDto,
    @Body(ZodValidationPipe) data: CloseMatchBodyDto
  ) {
    return this.matchService.closeMatch({ id: +id }, data);
  }

  @Delete("delete/:id")
  @ApiParam({ name: "id", type: Number })
  async deleteMatch(@Param("id", ParseIntPipe) id: GetMatchDto) {
    return this.matchService.deleteMatch({ id: +id });
  }

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
    return this.matchService.sendMessage(+request.user.sub, +id, body.message);
  }

  @Post(":id/bet")
  @UseGuards(UserGuard)
  @ApiBody({
    description: "Place a bet to a match",
    type: CreateMatchBetDto,
  })
  @ApiParam({
    name: "id",
    description: "Match id",
    type: "number",
  })
  placeBet(
    @Body(ZodValidationPipe) body: CreateMatchBetDto,
    @Request() request: JWTUserRequest,
    @Param("id") id: number
  ): Promise<Transaction> {
    return this.matchService.placeBet(+request.user.sub, +id, body);
  }
}
