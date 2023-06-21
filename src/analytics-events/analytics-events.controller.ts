import { Body, Controller, Get, Post } from "@nestjs/common";
import { AnalyticsEventsService } from "./analytics-events.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  MouseClickDto,
  ButtonClickDto,
  PathnameChangeDto,
  LeaveAppEventDto,
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
}
