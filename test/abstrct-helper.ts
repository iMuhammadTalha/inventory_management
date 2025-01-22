import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as http from "http";
import { AppService } from "../src/modules/main/app.service";
import Redis from "ioredis";

export abstract class Helper {
  protected app: INestApplication;
  protected token: string;
  protected dataSource: DataSource;
  protected redisClient: Redis;

  constructor(app: INestApplication) {
    this.app = app;
    this.dataSource = new DataSource(AppService.typeormConfig());
    this.redisClient = new Redis();
  }

  /**
   * clear `test` database
   */
  public async clearDB() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    await this.dataSource.dropDatabase();
    await this.dataSource.destroy();
  }

  /**
   * clear `test` database
   */
  public async afterAll() {
    await this.clearDB();
    await this.app.close();
  }

  public async stopMockServer(server: http.Server) {
    return new Promise<void>((resolve, reject) => {
      server.close((err: Error | undefined) => {
        if (!err) {
          return resolve();
        }
        return reject();
      });
    });
  }
}
