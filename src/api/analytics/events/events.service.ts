import { Inject, Injectable, Provider } from "@nestjs/common";
import {
  ButtonClickDto,
  EventsApi,
  GetHeatmapDataDto,
  HeatmapData,
  LeaveAppEventDto,
  MouseClickDto,
  PathnameChangeDto,
} from "./events.schema";
import { AnalyticsApi } from "../analytics.interface";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";

@Injectable()
class EventsImpl implements EventsApi {
  constructor(@Inject(AnalyticsApi) private analyticsApi: AnalyticsApi) {}
  async createButtonClickEvent(
    createButtonClickEventDto: ButtonClickDto
  ): Promise<void> {
    const response = await handleApiResponse<void>(
      await this.analyticsApi.fetch(`events/button-click`, {
        method: "POST",
        body: JSON.stringify({
          ...createButtonClickEventDto,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async createMouseClickEvent(
    createMouseClickEventDto: MouseClickDto
  ): Promise<void> {
    const response = await handleApiResponse<void>(
      await this.analyticsApi.fetch(`events/mouse-click`, {
        method: "POST",
        body: JSON.stringify({
          ...createMouseClickEventDto,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async createPathnameChangeEvent(
    createPathnameChangeEventDto: PathnameChangeDto
  ): Promise<void> {
    const response = await handleApiResponse<void>(
      await this.analyticsApi.fetch(`events/pathname-change`, {
        method: "POST",
        body: JSON.stringify({
          ...createPathnameChangeEventDto,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async createLeaveAppEvent(
    createLeaveAppEventDto: LeaveAppEventDto
  ): Promise<void> {
    const response = await handleApiResponse<void>(
      await this.analyticsApi.fetch(`events/leave-app`, {
        method: "POST",
        body: JSON.stringify({
          ...createLeaveAppEventDto,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async getButtonClickEvents(): Promise<ButtonClickDto[]> {
    const response = await handleApiResponse<ButtonClickDto[]>(
      await this.analyticsApi.fetch(`events/button-click`, {
        method: "GET",
      })
    );

    checkApiResponse(response);

    return response;
  }

  async getMouseClickEvents(): Promise<MouseClickDto[]> {
    const response = await handleApiResponse<MouseClickDto[]>(
      await this.analyticsApi.fetch(`events/mouse-click`, {
        method: "GET",
      })
    );

    checkApiResponse(response);

    return response;
  }

  async getLeaveAppEvents(): Promise<LeaveAppEventDto[]> {
    const response = await handleApiResponse<LeaveAppEventDto[]>(
      await this.analyticsApi.fetch(`events/leave-app`, {
        method: "GET",
      })
    );

    checkApiResponse(response);

    return response;
  }

  async getPathnameChangeEvents(): Promise<PathnameChangeDto[]> {
    const response = await handleApiResponse<PathnameChangeDto[]>(
      await this.analyticsApi.fetch(`events/pathname-change`, {
        method: "GET",
      })
    );

    checkApiResponse(response);

    return response;
  }

  async getHeatmapData(
    getHeatmapDataDto: GetHeatmapDataDto
  ): Promise<HeatmapData[]> {
    const response = await handleApiResponse<HeatmapData[]>(
      await this.analyticsApi.fetch(`events/heatmap-data`, {
        method: "POST",
        body: JSON.stringify({
          ...getHeatmapDataDto,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }
}

export const EventsApiProvider: Provider = {
  provide: EventsApi,
  useClass: EventsImpl,
};
