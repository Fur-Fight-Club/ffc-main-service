import { Test, TestingModule } from "@nestjs/testing";
import { PushNotificationsService } from "./push-notifications.service";
import { AuthApiProvider } from "src/api/auth/auth.service";
import { NotificationsApiProvider } from "src/api/notifications/notifications.service";
import { PushNotificationsApiProvider } from "src/api/notifications/push-notifications/push-notifications.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

describe("PushNotificationsService", () => {
  let service: PushNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PushNotificationsService,
        AuthService,
        AuthApiProvider,
        NotificationsApiProvider,
        PushNotificationsApiProvider,
        JwtService,
        ConfigService,
      ],
    }).compile();

    service = module.get<PushNotificationsService>(PushNotificationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
