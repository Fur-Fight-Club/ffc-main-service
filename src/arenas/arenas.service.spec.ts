import { Test, TestingModule } from "@nestjs/testing";
import { ArenasService } from "./arenas.service";
import { ImgurService } from "src/services/imgur.service";
import { PrismaService } from "src/services/prisma.service";
import { ArenaRepository } from "./arena.repository";
import { JwtService } from "@nestjs/jwt";

describe("ArenasService", () => {
  let service: ArenasService;

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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
