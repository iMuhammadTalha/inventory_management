/* eslint-disable no-console */
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { useContainer } from "class-validator";
import { AppService } from "@modules/main/app.service";
import { AppModule, imports } from "@modules/main/app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import express from "express";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { LoggerService } from "@utils/logger/logger.service";

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix("v1/api");

  app.disable("x-powered-by");
  app.enableCors({ origin: "*" });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  appSwaggerDoc(app, imports);

  await app.listen(process.env.APP_PORT);
  AppService.startup();
};

const appSwaggerDoc = (app: INestApplication, modules) => {
  const config = new DocumentBuilder()
    .setTitle("Inventory")
    .setDescription("App Backend APIs")
    .setVersion("1.0")
    .addServer(`http://localhost:${process.env.APP_PORT}`, "Local")
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: "Inventory API Docs",
    customfavIcon:
      "https://play-lh.googleusercontent.com/PGfKOUe2eR93IM4P7SpY7YJ0en_RFa92gZWur5VSWnR_qrTNR-7horCIYakEClBkGg=w240-h480-rw",
  });
};

bootstrap()
  .then(() => console.log("Server started on " + process.env.APP_PORT))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
