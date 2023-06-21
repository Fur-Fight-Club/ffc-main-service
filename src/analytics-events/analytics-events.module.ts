import { Module } from "@nestjs/common";
import { AnalyticsEventsService } from "./analytics-events.service";
import { AnalyticsEventsController } from "./analytics-events.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AnalyticsModule } from "src/api/analytics/analytics.module";
import { AnalyticsApiProvider } from "src/api/analytics/analytics.service";
import { EventsApiProvider } from "src/api/analytics/events/events.service";
import { AuthService } from "src/auth/auth.service";

@Module({
  imports: [ConfigModule, AuthModule, AnalyticsModule],
  controllers: [AnalyticsEventsController],
  providers: [
    AnalyticsEventsService,
    AnalyticsApiProvider,
    EventsApiProvider,
    AuthService,
  ],
})
export class AnalyticsEventsModule {}
