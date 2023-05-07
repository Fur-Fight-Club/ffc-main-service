import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MonsterService } from "./monster.service";
import { Monster } from "ffc-prisma-package/dist/client";
import {
  CreateMonsterDto,
  GetMonsterDto,
  RemoveMonsterDto,
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
  async getOne(@Body(ZodValidationPipe) data: GetMonsterDto) {
    return await this.monsterService.getMonster(data);
  }

  @Post()
  @HttpCode(201)
  create(@Body(ZodValidationPipe) data: CreateMonsterDto) {
    return this.monsterService.createMonster(data);
  }

  @Patch(":id")
  async update(@Body(ZodValidationPipe) data: UpdateMonsterDto) {
    return await this.monsterService.updateMonster(data);
  }

  @Delete(":id")
  async delete(@Body(ZodValidationPipe) data: RemoveMonsterDto) {
    return await this.monsterService.deleteMonster(data);
  }
}
