import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const serverHealthcheckSchema = z.object({
  server_status: z.number(),
  prisma_status: z.number(),
  timestamp: z.date(),
  service_name: z.string(),
  services: z.any(),
});

export type ServerHealthcheck = z.infer<typeof serverHealthcheckSchema>;

export class ServerHealCheckDto extends createZodDto(serverHealthcheckSchema) {}
