import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ServerHealthcheck } from "./app.schema";
import { PrismaService } from "./services/prisma.service";
import { ConfigService } from "@nestjs/config";
import fetch from "node-fetch";

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}
  async healthcheck(): Promise<ServerHealthcheck> {
    const services = [
      {
        name: "ffc-analytics",
        url: this.config.get<string>("ffc_analytics_url"),
      },
      {
        name: "ffc-auth",
        url: this.config.get<string>("ffc_auth_url"),
      },
      {
        name: "ffc-notifications",
        url: this.config.get<string>("ffc_notifications_url"),
      },
      {
        name: "ffc-payments",
        url: this.config.get<string>("ffc_payments_url"),
      },
    ];
    const promises = services.map(async (service) => {
      try {
        const response = await fetch(`${service.url}/ping`);

        return {
          name: service.name,
          url: service.url,
          status: response.status,
        };
      } catch (error) {
        return {
          name: service.name,
          url: service.url,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        };
      }
    });

    const results = await Promise.all(promises);

    return {
      server_status: HttpStatus.OK,
      prisma_status: await this.prismaHealthcheck(),
      timestamp: new Date(),
      service_name: "ffc-main-service",
      services: results,
    };
  }

  private async prismaHealthcheck(): Promise<number> {
    try {
      await this.prisma.$executeRaw`SELECT 1;`;
      return HttpStatus.OK;
    } catch (error) {
      // Log to logger service the error
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
