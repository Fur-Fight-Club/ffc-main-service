import { Test, TestingModule } from "@nestjs/testing";
import { ArenasService } from "./arenas.service";
import { ImageData, ImgurService } from "src/services/imgur.service";
import { PrismaService } from "src/services/prisma.service";
import { ArenaRepository } from "./arena.repository";
import { JwtService } from "@nestjs/jwt";
import { ImgurApiResponse } from "imgur";
import { Arena } from "ffc-prisma-package/dist/client";
import { CreateArenaDto } from "./arenas.schema";

const arena: Arena = {
  id: 1,
  name: "Arena 1",
  picture: "https://imgur.com/arena1",
  address: "123 Main St",
  city: "San Francisco",
  address2: "",
  country: "USA",
  latitude: 37.7749,
  longitude: 122.4194,
  zipcode: "94103",
};

describe("ArenasService", () => {
  let service: ArenasService;
  let imgurService: ImgurService;
  let arenaRepository: ArenaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArenasService,
        PrismaService,
        ArenaRepository,
        ImgurService,
        JwtService,
      ],
    }).compile();

    service = module.get<ArenasService>(ArenasService);
    imgurService = module.get<ImgurService>(ImgurService);
    arenaRepository = module.get<ArenaRepository>(ArenaRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create an arena with an uploaded image", async () => {
      const createArenaDto: CreateArenaDto = { ...arena };
      const imgurResponse = {
        link: "https://imgur.com/arena1",
        success: true,
        data: {},
      } as ImageData;

      jest
        .spyOn(imgurService, "uploadImage")
        .mockResolvedValueOnce(imgurResponse);
      jest.spyOn(arenaRepository, "createArena").mockResolvedValueOnce(arena);

      const result = await service.create(createArenaDto);

      expect(imgurService.uploadImage).toHaveBeenCalledWith(
        createArenaDto.picture
      );
      expect(arenaRepository.createArena).toHaveBeenCalledWith({
        data: {
          ...arena,
        },
      });
      expect(result).toEqual(arena);
    });
  });

  describe("findAll", () => {
    it("should return all arenas", async () => {
      const arenas = [arena, arena];

      jest.spyOn(arenaRepository, "getArenas").mockResolvedValueOnce(arenas);

      const result = await service.findAll();

      expect(arenaRepository.getArenas).toHaveBeenCalledWith({});
      expect(result).toEqual(arenas);
    });
  });

  describe("findOne", () => {
    it("should return the specified arena", async () => {
      const getArenaDto = { id: 1 };

      jest.spyOn(arenaRepository, "getArena").mockResolvedValueOnce(arena);

      const result = await service.findOne(getArenaDto);

      expect(arenaRepository.getArena).toHaveBeenCalledWith({
        where: { id: getArenaDto.id },
      });
      expect(result).toEqual(arena);
    });
  });

  describe("update", () => {
    it("should update the specified arena with an uploaded image", async () => {
      const updateArenaDto = {
        id: 1,
        name: "Updated Arena",
        picture: "base64image",
      };
      const imgurResponse: ImageData = {
        link: "https://imgur.com/updatedarena",
        success: true,
      };
      const updatedArena = {
        id: 1,
        name: "Updated Arena",
        picture: "https://imgur.com/updatedarena",
      };

      jest
        .spyOn(imgurService, "uploadImage")
        .mockResolvedValueOnce({ ...imgurResponse });
      jest.spyOn(arenaRepository, "updateArena").mockResolvedValueOnce({
        ...arena,
        picture: updatedArena.picture,
        name: updatedArena.name,
      });

      const result = await service.update(updateArenaDto);

      expect(imgurService.uploadImage).toHaveBeenCalledWith("base64image");
      expect(arenaRepository.updateArena).toHaveBeenCalledWith({
        where: { id: updateArenaDto.id },
        data: {
          id: updateArenaDto.id,
          name: updateArenaDto.name,
          picture: imgurResponse.link,
        },
      });
      expect(result).toEqual({
        ...arena,
        id: updatedArena.id,
        name: updatedArena.name,
        picture: updatedArena.picture,
      });
    });

    it("should update the specified arena without uploading an image", async () => {
      const updateArenaDto = {
        id: 2,
        name: "Updated Arena",
        picture: arena.picture,
      };
      const updatedArena = { ...arena, id: 2, name: "Updated Arena" };

      jest
        .spyOn(arenaRepository, "updateArena")
        .mockResolvedValueOnce({ ...arena, name: updatedArena.name });

      const result = await service.update(updateArenaDto);

      expect(arenaRepository.updateArena).toHaveBeenCalledWith({
        where: { id: updateArenaDto.id },
        data: updateArenaDto,
      });
      expect(result).toEqual({ ...arena, name: updatedArena.name });
    });
  });

  describe("remove", () => {
    it("should remove the specified arena", async () => {
      const deleteArenaDto = { id: 1 };

      jest.spyOn(arenaRepository, "deleteArena").mockResolvedValueOnce(arena);

      const result = await service.remove(deleteArenaDto);

      expect(arenaRepository.deleteArena).toHaveBeenCalledWith({
        where: { id: deleteArenaDto.id },
      });
      expect(result).toEqual(arena);
    });
  });
});
