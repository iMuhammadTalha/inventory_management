import { CommonModule } from "@modules/common/common.module";
import {
  MiddlewareConsumer,
  Module,
  ModuleMetadata,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerMiddleware } from "@utils/logger/logger.middleware";
import { LoggerModule } from "@utils/logger/logger.module";
import { WinstonModule } from "nest-winston";
import { AppService } from "./app.service";
import { InventoryModule } from "@modules/inventory/inventory.module";
import { SeedModule } from "@utils/seeder/seeder.module";

export const imports: ModuleMetadata["imports"] = [
  ConfigModule.forRoot({ envFilePath: [AppService.envConfiguration()] }),
  TypeOrmModule.forRoot(AppService.typeormConfig()),
  WinstonModule.forRootAsync({
    useFactory: () => AppService.createWinstonTransports(),
  }),
  LoggerModule,
  CommonModule,
  InventoryModule,
  SeedModule,
];

@Module({
  imports: [...imports],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
