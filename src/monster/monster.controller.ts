import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MonsterService } from "./monster.service";
import {
  CreateMonsterDto,
  GetMonsterDto,
  UpdateMonsterDto,
} from "./monster.schema";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("monster")
@ApiTags("Monster controller")
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.monsterService.getMonsters();
  }

  @Get("id")
  @HttpCode(200)
  async getOne(@Param("id", ParseIntPipe) data: GetMonsterDto) {
    return await this.monsterService.getMonster(data);
  }

  @Post()
  @HttpCode(201)
  create(@Body(ZodValidationPipe) data: CreateMonsterDto) {
    return this.monsterService.createMonster(data);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: GetMonsterDto,
    @Body(ZodValidationPipe) data: UpdateMonsterDto
  ) {
    return await this.monsterService.updateMonster({ ...data, id: +id });
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.monsterService.deleteMonster({ id: +id });
  }
}
