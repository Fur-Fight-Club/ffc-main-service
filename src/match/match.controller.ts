import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { MatchService } from "./match.service";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "src/auth/auth-user.guard";
import {
  CreateMessageApiBody,
  CreateMessageDto,
} from "src/api/notifications/match-message/match-message.interface";
import { ZodValidationPipe } from "nestjs-zod";
import { JWTUserRequest } from "src/auth/auth.model";

@Controller("match")
@ApiTags("Match Controller")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

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
