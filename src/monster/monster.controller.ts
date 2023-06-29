import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import { UserGuard } from "src/auth/auth-user.guard";
import { JWTUserRequest } from "src/auth/auth.model";
import { Roles } from "src/decorators/roles.decorator";
import {
  CreateMonsterDto,
  GetMonsterDto,
  UpdateMonsterDto,
} from "./monster.schema";
import { MonsterService } from "./monster.service";

@Controller("monster")
@ApiTags("Monster controller")
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(UserGuard)
  @Roles("USER", "ADMIN", "MONSTER_OWNER")
  //Get all monsters for one user
  async getAll(@Request() req: JWTUserRequest) {
    return await this.monsterService.getMonsters(req.user.sub);
  }

  @Get("userMonster/:id")
  // Get all monster for one user with userId
  async getAllMonsterOfOneUser(@Param("id", ParseIntPipe) data: number) {
    return await this.monsterService.getMonstersForOneUser(data);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "Monster ID",
    type: Number,
  })
  @UseGuards(UserGuard)
  @Roles("USER", "ADMIN", "MONSTER_OWNER")
  @HttpCode(200)
  async getOne(
    @Param("id", ParseIntPipe) data: number,
    @Request() req: JWTUserRequest
  ) {
    return await this.monsterService.getMonster(data, req.user.sub);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(UserGuard)
  @Roles("USER", "ADMIN", "MONSTER_OWNER")
  @ApiBody({
    description: "Create monster",
    type: CreateMonsterDto,
  })
  create(@Body(ZodValidationPipe) data: CreateMonsterDto) {
    return this.monsterService.createMonster(data);
  }

  @Patch(":id")
  @UseGuards(UserGuard)
  @Roles("USER", "ADMIN", "MONSTER_OWNER")
  @ApiParam({
    name: "id",
    description: "Monster ID",
    type: Number,
  })
  @ApiBody({
    type: UpdateMonsterDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: GetMonsterDto,
    @Body(ZodValidationPipe) data: UpdateMonsterDto,
    @Request() req: JWTUserRequest
  ) {
    return await this.monsterService.updateMonster(
      { ...data, id: +id },
      req.user.sub
    );
  }

  @Delete(":id")
  @UseGuards(UserGuard)
  @Roles("USER", "ADMIN", "MONSTER_OWNER")
  @ApiParam({
    name: "id",
    description: "Monster ID",
    type: Number,
  })
  async delete(@Param("id") id: string, @Request() req: JWTUserRequest) {
    return await this.monsterService.deleteMonster({ id: +id }, req.user.sub);
  }
}
