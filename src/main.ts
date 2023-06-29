import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { json } from "express";

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
  console.log("ffc-main => ", process.env.FFC_MAIN_URL);
  console.log("ffc-analytics => ", process.env.FFC_ANALYTICS_URL);
  console.log("ffc-auth => ", process.env.FFC_AUTH_URL);
  console.log("ffc-notifications => ", process.env.FFC_NOTIFICATIONS_URL);
  console.log("ffc-payments => ", process.env.FFC_PAYMENTS_URL);
}
bootstrap();
