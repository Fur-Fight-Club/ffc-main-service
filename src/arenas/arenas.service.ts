import { Injectable } from "@nestjs/common";
import { ImgurService } from "src/services/imgur.service";
import { ArenaRepository } from "./arena.repository";
import {
  CreateArenaDto,
  DeleteArenaDto,
  GetArenaDto,
  UpdateArenaDto,
} from "./arenas.schema";

@Injectable()
export class ArenasService {
  constructor(
    private readonly arenaRepository: ArenaRepository,
    private readonly imgur: ImgurService
  ) {}
  async create(createArenaDto: CreateArenaDto) {
    if (createArenaDto?.picture) {
      const imgurResponse = await this.imgur.uploadImage(
        createArenaDto.picture
      );
      createArenaDto.picture = imgurResponse.link;
    }
    return this.arenaRepository.createArena({ data: createArenaDto });
  }

  findAll() {
    return this.arenaRepository.getArenas({});
  }

  findOne(getArenaDto: GetArenaDto) {
    return this.arenaRepository.getArena({ where: { id: getArenaDto.id } });
  }

  async update(updateArenaDto: UpdateArenaDto) {
    if (!updateArenaDto.picture.includes("https")) {
      const imgurResponse = await this.imgur.uploadImage(
        updateArenaDto.picture
      );
      updateArenaDto.picture = imgurResponse.link;
    }

    return this.arenaRepository.updateArena({
      where: { id: updateArenaDto.id },
      data: updateArenaDto,
    });
  }

  remove(deleteArenaDto: DeleteArenaDto) {
    return this.arenaRepository.deleteArena({
      where: { id: deleteArenaDto.id },
    });
  }
}
