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
import { CreateMonsterDto } from "./monster.schema";
import { ZodValidationPipe } from "nestjs-zod";

@Controller("monster")
@ApiTags("Monster controller")
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Get()
  @HttpCode(200)
  getAll(): Promise<Monster[]> {
    return this.monsterService.findAll();
  }

  @Get("id")
  @HttpCode(200)
  getOne(@Param("id") id: number): Promise<Monster> {
    return this.monsterService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body(ZodValidationPipe) body: CreateMonsterDto) {
    return this.monsterService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() body: Monster): Promise<Monster> {
    return this.monsterService.update(id, body);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<Monster> {
    return this.monsterService.delete(id);
  }
}
