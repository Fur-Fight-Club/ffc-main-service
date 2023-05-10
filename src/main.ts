import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

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

  await app.listen(port);

  console.log(
    `Application ${configService.get<string>(
      "service"
    )} is running on: ${await app.getUrl()}`
  );
}
bootstrap();
