import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { json } from "express";
const fetch = require("node-fetch");

const services = [
  {
    name: "ffc-main",
    url: process.env.FFC_MAIN_URL,
  },
  {
    name: "ffc-analytics",
    url: process.env.FFC_ANALYTICS_URL,
  },
  {
    name: "ffc-auth",
    url: process.env.FFC_AUTH_URL,
  },
  {
    name: "ffc-notifications",
    url: process.env.FFC_NOTIFICATIONS_URL,
  },
  {
    name: "ffc-payments",
    url: process.env.FFC_PAYMENTS_URL,
  },
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Fur Fight Club — Main service")
    .setDescription("Swagger of the main service of Fur Fight Club")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "authorization",
      description: "Bearer authorization token for user",
      in: "header",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("app_port");

  app.use(json({ limit: "50mb" }));

  app.enableCors();

  await app.listen(port);

  console.log(
    `Application ${configService.get<string>(
      "service"
    )} is running on: ${await app.getUrl()}`
  );
  console.log("Ready to connect to services...");

  services.forEach(async (service) => {
    try {
      const response = await fetch(`${service.url}/ping`);
      const data = await response.text();
      console.log(`${service.name} => ${data}`);
    } catch (error) {
      console.error(`Error connecting to ${service.name}:`, error);
    }
  });
}
bootstrap();
