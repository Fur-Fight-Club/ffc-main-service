import { Injectable } from "@nestjs/common";
import { Monster } from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";
import { CreateMonsterDto, MonsterDto } from "./monster.schema";

@Injectable()
export class MonsterService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Monster[]> {
    return this.prisma.monster.findMany();
  }

  async findOne(id: number): Promise<Monster> {
    return this.prisma.monster.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createMonsterDto: CreateMonsterDto): Promise<MonsterDto> {
    const { name, weight, fk_user, weightCategoryId, monsterTypeId } =
      createMonsterDto;
    const monster = await this.prisma.monster.create({
      data: {
        name,
        weight,
        fk_user,
        weightCategoryId,
        monsterTypeId,
      },
    });

    return monster;
  }

  async update(id: number, data: Monster): Promise<Monster> {
    return this.prisma.monster.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Monster> {
    return this.prisma.monster.delete({
      where: {
        id,
      },
    });
  }
}
