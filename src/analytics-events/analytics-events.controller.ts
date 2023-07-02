import { Body, Controller, Get, Post } from "@nestjs/common";
import { AnalyticsEventsService } from "./analytics-events.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  MouseClickDto,
  ButtonClickDto,
  PathnameChangeDto,
  LeaveAppEventDto,
  GetHeatmapDataDto,
  HeatmapData,
  DemographicDataEventDto,
  DemographicData,
  GetChartsDataResponse,
  GetStatCardResponse,
  GetTablesDataResponse,
} from "src/api/analytics/events/events.schema";

@Controller("analytics-events")
export class AnalyticsEventsController {
  constructor(
    private readonly analyticsEventsService: AnalyticsEventsService
  ) {}

  @Post("mouse-click")
  async mouseClick(
    @Body(ZodValidationPipe) mouseClickDto: MouseClickDto
  ): Promise<void> {
    return await this.analyticsEventsService.mouseClick(mouseClickDto);
  }

  @Post("button-click")
  async buttonClick(
    @Body(ZodValidationPipe) buttonClickDto: ButtonClickDto
  ): Promise<void> {
    return await this.analyticsEventsService.buttonClick(buttonClickDto);
  }

  @Post("pathname-change")
  async pathnameChange(
    @Body(ZodValidationPipe) pathnameChangeDto: PathnameChangeDto
  ): Promise<void> {
    return await this.analyticsEventsService.pathnameChange(pathnameChangeDto);
  }

  @Post("leave-app")
  async leaveApp(
    @Body(ZodValidationPipe) leaveAppDto: LeaveAppEventDto
  ): Promise<void> {
    return await this.analyticsEventsService.leaveApp(leaveAppDto);
  }

  @Get("button-click")
  async getButtonClickEvents(): Promise<any[]> {
    return await this.analyticsEventsService.getButtonEvents();
  }

  @Get("pathname-change")
  async getPathnameChangeEvents(): Promise<any[]> {
    return await this.analyticsEventsService.getPathnameChangeEvents();
  }

  @Get("mouse-click")
  async getMouseClickEvents(): Promise<any[]> {
    return await this.analyticsEventsService.getMouseClickEvents();
  }

  @Get("leave-app")
  async getLeaveAppEvents(): Promise<any[]> {
    return await this.analyticsEventsService.getLeaveAppEvents();
  }

  @Post("heatmap-data")
  async getHeatmapData(
    @Body(ZodValidationPipe) getHeatmapData: GetHeatmapDataDto
  ): Promise<HeatmapData[]> {
    return await this.analyticsEventsService.getHeatmapData(getHeatmapData);
  }

  @Post("demographic-data")
  async demographicData(
    @Body(ZodValidationPipe) demographicData: DemographicDataEventDto
  ): Promise<{ success: boolean }> {
    return await this.analyticsEventsService.setDemographicData(
      demographicData
    );
  }

  @Get("demographic-data")
  async getDemographicData(): Promise<DemographicData[]> {
    return await this.analyticsEventsService.getDemographicData();
  }

  @Get("cards-data")
  async getStatCards(): Promise<GetStatCardResponse> {
    return await this.analyticsEventsService.getStatCards();
  }

  @Get("tables-data")
  async getTablesDatas(): Promise<GetTablesDataResponse> {
    return await this.analyticsEventsService.getTablesDatas();
  }

  @Get("charts-data")
  async getChartsData(): Promise<GetChartsDataResponse> {
    return await this.analyticsEventsService.getChartsData();
  }
}
