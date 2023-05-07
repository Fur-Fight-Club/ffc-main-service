import { Injectable } from "@nestjs/common";
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

  async getMonsters(): Promise<MonsterDto[]> {
    const monsters = await this.monsterRepository.getMonsters({});

    return monsters;
  }

  async getMonster(params: GetMonsterDto): Promise<MonsterDto> {
    const { id } = params;
    const monster = await this.monsterRepository.getMonster({
      where: {
        id,
      },
    });

    return monster;
  }

  async createMonster(createMonsterDto: CreateMonsterDto): Promise<MonsterDto> {
    const { name, weight, fk_user, weightCategoryId, monsterTypeId } =
      createMonsterDto;
    const monster = await this.monsterRepository.createMonster({
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

  // async update(updateMonsterDto: UpdateMonsterDto): Promise<Monster> {
  //   const { name, weight, weightCategoryId, monsterTypeId } = updateMonsterDto;
  //   const monster = await this.monsterRepository.updateMonster({
  //     data: {
  //       name,
  //       weight,
  //       weightCategoryId,
  //       monsterTypeId,
  //     },
  //   });

  //   return monster;
  // }

  async deleteMonster(params: GetMonsterDto): Promise<MonsterDto> {
    const { id } = params;
    const monster = await this.monsterRepository.deleteMonster({
      where: {
        id,
      },
    });

    return monster;
  }
}
