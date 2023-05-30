import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateMonsterDto,
  GetMonsterDto,
  MonsterDto,
  UpdateMonsterDto,
} from "./monster.schema";
import { MonsterRepository } from "./monster.repository";

@Injectable()
export class MonsterService {
  constructor(private monsterRepository: MonsterRepository) {}

  async getMonsters(userId: number): Promise<MonsterDto[]> {
    const monsters = await this.monsterRepository.getMonsters({
      where: {
        fk_user: userId,
      },
    });

    return monsters;
  }

  async getMonster(params: number, userId: number): Promise<MonsterDto> {
    const id = params;
    const monster = await this.monsterRepository.getMonster({
      where: {
        id,
      },
    });

    if (!monster || monster.fk_user !== userId) {
      throw new NotFoundException("Monster not found");
    }

    return monster;
  }

  async createMonster(createMonsterDto: CreateMonsterDto): Promise<MonsterDto> {
    const { name, weight, fk_user, weight_category, monster_type } =
      createMonsterDto;
    const monster = await this.monsterRepository.createMonster({
      data: {
        name,
        weight,
        fk_user,
        weight_category,
        monster_type,
      },
    });

    return monster;
  }

  async updateMonster(
    updateMonsterDto: UpdateMonsterDto,
    userId: number
  ): Promise<MonsterDto> {
    const { name, weight, weight_category, monster_type } = updateMonsterDto;
    const monsterToBeUpdated = await this.monsterRepository.getMonster({
      where: {
        id: updateMonsterDto.id,
      },
    });

    if (!monsterToBeUpdated || monsterToBeUpdated.fk_user !== userId) {
      throw new NotFoundException("Monster not found");
    }

    const monster = await this.monsterRepository.updateMonster({
      where: {
        id: updateMonsterDto.id,
      },
      data: {
        name,
        weight,
        weight_category,
        monster_type,
      },
    });

    return monster;
  }

  async deleteMonster(
    params: GetMonsterDto,
    userId: number
  ): Promise<MonsterDto> {
    const { id } = params;
    const monsterToBeDeleted = await this.monsterRepository.getMonster({
      where: {
        id,
      },
    });

    if (!monsterToBeDeleted || monsterToBeDeleted.fk_user !== userId) {
      throw new NotFoundException("Monster not found");
    }

    const monster = await this.monsterRepository.deleteMonster({
      where: {
        id,
      },
    });

    return monster;
  }
}
