import { Test, TestingModule } from "@nestjs/testing";
import { MonsterService } from "./monster.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { AuthService } from "src/auth/auth.service";
import { ImgurService } from "src/services/imgur.service";
import { PrismaService } from "src/services/prisma.service";
import { MonsterRepository } from "./monster.repository";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("MonsterService", () => {
  let service: MonsterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonsterService,
        MonsterRepository,
        AuthService,
        AuthApiProvider,
        PrismaService,
        ImgurService,
        UserApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<MonsterService>(MonsterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
