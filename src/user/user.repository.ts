import { Injectable } from "@nestjs/common";
import { Prisma, User } from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getMe(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    const { where } = params;
    return this.prisma.user.findUnique({
      where,
      include: { Monster: true },
    });
  }
}
