import { Test, TestingModule } from "@nestjs/testing";
import { AccountService } from "./account.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { UserApiProvider } from "src/api/auth/user/user.service";
import { EmailApiProvider } from "src/api/notifications/mails/mails.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/services/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserApi } from "src/api/auth/user/user.schema";
import { EmailApi } from "src/api/notifications/mails/mails.schema";
import { InternalServerErrorException } from "@nestjs/common";
import { Roles, User } from "ffc-prisma-package/dist/client";

const user = {
  id: 1,
  email: "test@example.com",
  firstname: "John",
  lastname: "Doe",
  StripeAccount: [],
  email_token: null,
  is_email_verified: true,
  password: "hashed_password",
  role: Roles.USER,
} as User;

describe("AccountService", () => {
  let service: AccountService;
  let userApi: UserApi;
  let emailApi: EmailApi;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        AuthService,
        AuthApiProvider,
        UserApiProvider,
        PrismaService,
        NotificationsApiProvider,
        EmailApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    userApi = module.get<UserApi>(UserApi);
    emailApi = module.get<EmailApi>(EmailApi);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("confirmAccount", () => {
    it("should confirm the user account", async () => {
      const emailToken = "email-token";
      const response = true;

      jest.spyOn(userApi, "confirmAccount").mockResolvedValueOnce(response);

      const result = await service.confirmAccount(emailToken);

      expect(userApi.confirmAccount).toHaveBeenCalledWith(emailToken);
      expect(result).toEqual(response);
    });
  });

  describe("askResetPassword", () => {
    it("should ask for password reset and send the reset email", async () => {
      const email = "test@example.com";
      const emailToken = "email-token";
      const authServiceResponse = { email_token: emailToken };
      const emailServiceResponse = true;

      jest
        .spyOn(userApi, "askResetPassword")
        .mockResolvedValueOnce(authServiceResponse);
      jest.spyOn(prismaService.user, "findUnique").mockResolvedValueOnce(user);
      jest
        .spyOn(emailApi, "sendPasswordResetEmail")
        .mockResolvedValueOnce(emailServiceResponse);

      const result = await service.askResetPassword(email);

      expect(userApi.askResetPassword).toHaveBeenCalledWith(email);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(emailApi.sendPasswordResetEmail).toHaveBeenCalledWith(
        email,
        user.firstname,
        emailToken
      );
      expect(result).toEqual(emailServiceResponse);
    });

    it("should throw InternalServerErrorException if no email token is returned", async () => {
      const email = "test@example.com";
      const authServiceResponse = {};

      jest.spyOn(userApi, "askResetPassword").mockResolvedValueOnce({
        email_token: null,
      });

      await expect(service.askResetPassword(email)).rejects.toThrow(
        InternalServerErrorException
      );
      expect(userApi.askResetPassword).toHaveBeenCalledWith(email);
    });

    it("should throw InternalServerErrorException if an error occurs while sending the email", async () => {
      const email = "test@example.com";
      const emailToken = "email-token";
      const authServiceResponse = { email_token: emailToken };

      jest
        .spyOn(userApi, "askResetPassword")
        .mockResolvedValueOnce(authServiceResponse);
      jest.spyOn(prismaService.user, "findUnique").mockResolvedValueOnce(user);
      jest
        .spyOn(emailApi, "sendPasswordResetEmail")
        .mockResolvedValueOnce(false);

      await expect(service.askResetPassword(email)).rejects.toThrow(
        InternalServerErrorException
      );
      expect(userApi.askResetPassword).toHaveBeenCalledWith(email);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(emailApi.sendPasswordResetEmail).toHaveBeenCalledWith(
        email,
        user.firstname,
        emailToken
      );
    });
  });

  describe("resetPassword", () => {
    it("should reset the user password", async () => {
      const emailToken = "email-token";
      const password = "new-password";
      const response = { id: 1, email: "test@example.com" };

      jest.spyOn(userApi, "resetPassword").mockResolvedValueOnce(response);

      const result = await service.resetPassword(emailToken, password);

      expect(userApi.resetPassword).toHaveBeenCalledWith(emailToken, password);
      expect(result).toEqual(response);
    });
  });
});
