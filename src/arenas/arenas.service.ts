import { Injectable } from "@nestjs/common";
import {
  CreateArenaDto,
  DeleteArenaDto,
  GetArenaDto,
  UpdateArenaDto,
} from "./arenas.schema";
import { ArenaRepository } from "./arena.repository";

@Injectable()
export class ArenasService {
  constructor(private readonly arenaRepository: ArenaRepository) {}
  create(createArenaDto: CreateArenaDto) {
    return this.arenaRepository.createArena({ data: createArenaDto });
  }

  findAll() {
    return this.arenaRepository.getArenas({});
  }

  findOne(getArenaDto: GetArenaDto) {
    return this.arenaRepository.getArena({ where: { id: getArenaDto.id } });
  }

  update(updateArenaDto: UpdateArenaDto) {
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
