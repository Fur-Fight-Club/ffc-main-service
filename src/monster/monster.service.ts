import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CreateMonsterDto,
  GetMonsterDto,
  MonsterDto,
  UpdateMonsterDto,
} from "./monster.schema";
import { MonsterRepository } from "./monster.repository";
import { ImageData, ImgurService } from "src/services/imgur.service";

@Injectable()
export class MonsterService {
  constructor(
    private monsterRepository: MonsterRepository,
    private readonly imgurService: ImgurService
  ) {}

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
    const { name, weight, fk_user, weight_category, monster_type, picture } =
      createMonsterDto;

    const imgurImage = await this.imgurService.uploadImage(picture);

    if (!imgurImage.success) {
      throw new BadGatewayException(
        "Error while uploading image to imgur",
        imgurImage.data
      );
    }

    const monster = await this.monsterRepository.createMonster({
      data: {
        name,
        weight,
        fk_user,
        weight_category,
        monster_type,
        picture: imgurImage.link,
      },
    });

    return monster;
  }

  async updateMonster(
    updateMonsterDto: UpdateMonsterDto,
    userId: number
  ): Promise<MonsterDto> {
    const { name, weight, weight_category, monster_type, picture } =
      updateMonsterDto;

    const monsterToBeUpdated = await this.monsterRepository.getMonster({
      where: {
        id: updateMonsterDto.id,
      },
    });

    if (!monsterToBeUpdated || monsterToBeUpdated.fk_user !== userId) {
      throw new NotFoundException("Monster not found");
    }

    let imgurUpdatedImage: ImageData;
    if (picture) {
      const imgurImage = await this.imgurService.uploadImage(picture);

      if (!imgurImage.success) {
        throw new BadGatewayException(
          "Error while uploading image to imgur",
          imgurImage.data
        );
      }

      imgurUpdatedImage = imgurImage;
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
        picture: picture ? imgurUpdatedImage.link : undefined,
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
