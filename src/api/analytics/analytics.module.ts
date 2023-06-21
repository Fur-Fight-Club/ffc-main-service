import { Module } from "@nestjs/common";
import { AnalyticsApiProvider } from "./analytics.service";
import { AuthService } from "src/auth/auth.service";
import { EventsApiProvider } from "./events/events.service";
import { EventsApi } from "./events/events.schema";

@Module({
  providers: [AnalyticsApiProvider, AuthService, EventsApiProvider],
  exports: [EventsApi],
})
export class AnalyticsModule {}
