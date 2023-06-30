import { Inject, Injectable } from "@nestjs/common";
import {
  DemographicData,
  DemographicDataEventDto,
  EventsApi,
  GetHeatmapDataDto,
  HeatmapData,
  MouseClickDto,
} from "src/api/analytics/events/events.schema";
import { ButtonClickDto } from "src/api/analytics/events/events.schema";
import { PathnameChangeDto } from "src/api/analytics/events/events.schema";
import { LeaveAppEventDto } from "src/api/analytics/events/events.schema";

@Injectable()
export class AnalyticsEventsService {
  constructor(@Inject(EventsApi) private readonly eventsApi: EventsApi) {}
  mouseClick(mouseClickDto: MouseClickDto): Promise<void> {
    return this.eventsApi.createMouseClickEvent(mouseClickDto);
  }
  buttonClick(buttonClickDto: ButtonClickDto): Promise<void> {
    return this.eventsApi.createButtonClickEvent(buttonClickDto);
  }
  pathnameChange(pathnameChangeDto: PathnameChangeDto): Promise<void> {
    return this.eventsApi.createPathnameChangeEvent(pathnameChangeDto);
  }
  leaveApp(leaveAppDto: LeaveAppEventDto): Promise<void> {
    return this.eventsApi.createLeaveAppEvent(leaveAppDto);
  }
  async getButtonEvents(): Promise<any[]> {
    return await this.eventsApi.getButtonClickEvents();
  }
  async getPathnameChangeEvents(): Promise<any[]> {
    return await this.eventsApi.getPathnameChangeEvents();
  }
  async getMouseClickEvents(): Promise<any[]> {
    return await this.eventsApi.getMouseClickEvents();
  }
  async getLeaveAppEvents(): Promise<any[]> {
    return await this.eventsApi.getLeaveAppEvents();
  }
  getHeatmapData(getHeatmapData: GetHeatmapDataDto): Promise<HeatmapData[]> {
    return this.eventsApi.getHeatmapData(getHeatmapData);
  }
  getDemographicData(): Promise<DemographicData[]> {
    return this.eventsApi.getDemographicData();
  }
  setDemographicData(
    demographicData: DemographicDataEventDto
  ): Promise<{ success: boolean }> {
    return this.eventsApi.createDemographicDataEvent(demographicData);
  }
}
