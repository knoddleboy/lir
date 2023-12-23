import cookieParser from "cookie-parser";
import { json } from "express";
import helmet from "helmet";

import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "~/app.module";
import { Config } from "~/config/schema";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === "development" ? ["debug"] : ["log", "warn", "error"],
  });

  const configService = app.get(ConfigService<Config>);

  // TODO: revise on avatar uploading
  app.use(
    json({
      limit: "5mb",
    })
  );

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: process.env.NODE_ENV === "production",
  });

  if (process.env.NODE_ENV === "production") {
    app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
  }

  app.setGlobalPrefix("api");

  const port = configService.get<number>("PORT") || 3001;

  await app.listen(port);

  Logger.log(`⚡️ @lir/api is running on port ${port}`);
}
bootstrap();
