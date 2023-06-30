import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const buttonClickSchema = z.object({
  event: z.string(),
  event_id: z.string(),
  timestamp: z.number(),
  user: z.number(),
  uuid: z.string(),
  pathname: z.string(),
  buttonContent: z.string(),
});

export class ButtonClickDto extends createZodDto(buttonClickSchema) {
  @ApiProperty({
    description: "The event type",
    example: "button_click",
  })
  event: string;

  @ApiProperty({
    description: "The event id",
    example: "button-analytic-id",
  })
  event_id: string;

  @ApiProperty({
    description: "The timestamp of the event",
    example: 1620000000000,
  })
  timestamp: number;

  @ApiProperty({
    description: "The user id",
    example: 1,
  })
  user: number;

  @ApiProperty({
    description: "The uuid of the user",
    example: "my-uuid",
  })
  uuid: string;

  @ApiProperty({
    description: "The pathname of the page",
    example: "/test/path",
  })
  pathname: string;

  @ApiProperty({
    description: "The content of the button",
    example: "Button content",
  })
  buttonContent: string;
}

export const pathnameChangeSchema = z.object({
  event: z.string(),
  event_id: z.string(),
  timestamp: z.number(),
  user: z.number(),
  uuid: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  userAgent: z.object({
    browser: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    os: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    platform: z.string().optional(),
    language: z.string().optional(),
  }),
});

export class PathnameChangeDto extends createZodDto(pathnameChangeSchema) {
  @ApiProperty({
    description: "The event type",
    example: "pathname_change",
  })
  event: string;

  @ApiProperty({
    description: "The event id",
    example: "/test/path",
  })
  event_id: string;

  @ApiProperty({
    description: "The timestamp of the event",
    example: 1620000000000,
  })
  timestamp: number;

  @ApiProperty({
    description: "The user id",
    example: 1,
  })
  user: number;

  @ApiProperty({
    description: "The uuid of the user",
    example: "my-uuid",
  })
  uuid: string;

  @ApiProperty({
    description: "The start time of the event",
    example: 1620000000000,
  })
  startTime: number;

  @ApiProperty({
    description: "The end time of the event",
    example: 1620000000000,
  })
  endTime: number;

  @ApiProperty({
    description: "The user agent of the user",
    example: {
      browser: {
        name: "Chrome",
        version: "90.0.4430.212",
      },
      os: {
        name: "Windows",
        version: "10.0",
      },
      platform: "Win32",
      language: "en-US",
    },
  })
  userAgent: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    platform: string;
    language: string;
  };
}

export const mouseClickSchema = z.object({
  event: z.string(),
  event_id: z.string(),
  timestamp: z.number(),
  user: z.number(),
  uuid: z.string(),
  pathname: z.string(),
  click: z.object({
    x: z.number(),
    y: z.number(),
  }),
  window: z.object({
    width: z.number(),
    height: z.number(),
  }),
  userAgent: z.object({
    browser: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    os: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    platform: z.string().optional(),
    language: z.string().optional(),
  }),
});

export class MouseClickDto extends createZodDto(mouseClickSchema) {
  @ApiProperty({
    description: "The event type",
    example: "mouse_click",
  })
  event: string;

  @ApiProperty({
    description: "The event id",
    example: "analyticsWrapper",
  })
  event_id: string;

  @ApiProperty({
    description: "The timestamp of the event",
    example: 1623168000000,
  })
  timestamp: number;

  @ApiProperty({
    description: "The user id",
    example: 1,
  })
  user: number;

  @ApiProperty({
    description: "The uuid of the user",
    example: "my-uuid",
  })
  uuid: string;

  @ApiProperty({
    description: "The pathname of the page",
    example: "/my/route",
  })
  pathname: string;

  @ApiProperty({
    description: "The click coordinates",
    example: {
      x: 100,
      y: 100,
    },
  })
  click: {
    x: number;
    y: number;
  };

  @ApiProperty({
    description: "The window dimensions",
    example: {
      width: 1920,
      height: 1080,
    },
  })
  window: {
    width: number;
    height: number;
  };

  @ApiProperty({
    description: "The user agent",
    example: {
      browser: {
        name: "Chrome",
        version: "91.0.4472.77",
      },
      os: {
        name: "Windows",
        version: "10.0",
      },
      platform: "Desktop",
      language: "en-US",
    },
  })
  userAgent: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    platform: string;
    language: string;
  };
}

export const leaveAppEventSchema = z.object({
  event: z.string(),
  event_id: z.string(),
  timestamp: z.number(),
  user: z.number(),
  uuid: z.string(),
  visitedPages: z.array(z.object({ page: z.string(), timestamp: z.number() })),
  userAgent: z.object({
    browser: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    os: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }),
    platform: z.string().optional(),
    language: z.string().optional(),
  }),
});

export class LeaveAppEventDto extends createZodDto(leaveAppEventSchema) {
  @ApiProperty({
    description: "The event type",
    example: "page_unload",
  })
  event: string;

  @ApiProperty({
    description: "The event id",
    example: "analyticsWrapper",
  })
  event_id: string;

  @ApiProperty({
    description: "The timestamp of the event",
    example: 1623168000000,
  })
  timestamp: number;

  @ApiProperty({
    description: "The user id",
    example: 1,
  })
  user: number;

  @ApiProperty({
    description: "The uuid of the user",
    example: "my-uuid",
  })
  uuid: string;

  @ApiProperty({
    description: "The pages visited by the user",
    example: [
      {
        page: "/my/route",
        timestamp: 1623168000000,
      },
    ],
  })
  visitedPages: {
    page: string;
    timestamp: number;
  }[];

  @ApiProperty({
    description: "The user agent",
    example: {
      browser: {
        name: "Chrome",
        version: "91.0.4472.77",
      },
      os: {
        name: "Windows",
        version: "10.0",
      },
      platform: "Desktop",
      language: "en-US",
    },
  })
  userAgent: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    platform: string;
    language: string;
  };
}

export const getHeatmapDataSchema = z.object({
  count: z.number().optional(),
  route: z.string(),
});

export class GetHeatmapDataDto extends createZodDto(getHeatmapDataSchema) {
  @ApiProperty({
    description: "Amount of data to retrieve",
    example: 100,
  })
  count?: number;

  @ApiProperty({
    description: "The route to collect data from",
    example: "/my/route",
  })
  route: string;
}

export interface HeatmapData {
  window: {
    width: number;
    height: number;
  };
  click: {
    x: number;
    y: number;
  };
}

export const demographicDataEventSchema = z.object({
  ip: z.string(),
});

export class DemographicDataEventDto extends createZodDto(
  demographicDataEventSchema
) {
  @ApiProperty({
    description: "The ip of the user",
    example: "34.140.90.116",
  })
  ip: string;
}

export interface DemographicData {
  id: string;
  event: "demographic";
  timestamp: number;
  ip: string;
  isp: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface EventsApi {
  createButtonClickEvent(
    createButtonClickEventDto: ButtonClickDto
  ): Promise<void>;

  createMouseClickEvent(createMouseClickEventDto: MouseClickDto): Promise<void>;

  createPathnameChangeEvent(
    createPathnameChangeEventDto: PathnameChangeDto
  ): Promise<void>;

  createLeaveAppEvent(createLeaveAppEventDto: LeaveAppEventDto): Promise<void>;

  createDemographicDataEvent(
    createDemographicDataEventDto: DemographicDataEventDto
  ): Promise<{ success: boolean }>;

  getButtonClickEvents(): Promise<ButtonClickDto[]>;

  getMouseClickEvents(): Promise<MouseClickDto[]>;

  getPathnameChangeEvents(): Promise<PathnameChangeDto[]>;

  getLeaveAppEvents(): Promise<LeaveAppEventDto[]>;

  getHeatmapData(getHeatmapDataDto: GetHeatmapDataDto): Promise<HeatmapData[]>;

  getDemographicData(): Promise<DemographicData[]>;
}

export const EventsApi = "EventsApi";
