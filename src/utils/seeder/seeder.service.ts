/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, Logger } from "@nestjs/common";
import { DataSource, QueryRunner } from "typeorm";

import { LoggerService } from "@utils/logger/logger.service";
import productData from "./products.json";
import { Product } from "@modules/inventory/entities/product.entity";

@Injectable()
export class SeedService {
  constructor(
    private readonly logger: LoggerService,
    private readonly dataSource: DataSource
  ) {
    this.seedData()
      .then((data) => Logger.log(data))
      .catch((err) => Logger.error(err));
  }

  async seedData() {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.seedProduct(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error, "SeederService");
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Seeds the product table with initial data.
   * @param queryRunner The QueryRunner instance to use for the operation.
   */
  private async seedProduct(queryRunner: QueryRunner) {
    await queryRunner.manager.save(
      Product,
      productData as unknown as Product[]
    );
  }
}
