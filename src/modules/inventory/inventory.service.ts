import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderDto, StockUpdateDto } from "./inventory.dto";
import { Product } from "./entities/product.entity";
import { EventType } from "./inventory.enum";
import {
  NoReservedProduct,
  ProductNotAvailable,
  ProductNotFound,
} from "./inventory.exception";
import { LOW_STOCK_THRESHOLD } from "@utils/constants";

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  /**
   *
   * @param event
   * @returns
   */
  async updateStock(event: StockUpdateDto) {
    const { eventType, productId, quantity } = event;

    const product = await this.getStockLevel(productId);

    if (eventType === EventType.STOCK_UPDATE) {
      const result = await this.productRepository.increment(
        { productId },
        "quantity",
        quantity
      );
      await this.checkLowStock(productId);
      return result;
    }

    if (eventType === EventType.ORDER_PLACED) {
      if (quantity > product.quantity) {
        throw new ProductNotAvailable();
      }
      const result = await this.productRepository.decrement(
        { productId },
        "quantity",
        quantity
      );
      await this.checkLowStock(productId);
      return result;
    }
  }

  /**
   *
   * @param productId
   * @returns
   */
  async getStockLevel(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new ProductNotFound();
    }
    return product;
  }

  private async checkLowStock(productId: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (product && product.quantity < LOW_STOCK_THRESHOLD) {
      await this.triggerLowStockAlert(productId, product.quantity);
    }
  }

  /**
   *
   * @param productId
   * @param quantity
   */
  async confirmOrder(productId: string, body: OrderDto): Promise<void> {
    const product = await this.getStockLevel(productId);
    const { quantity } = body;
    if (product.quantity < quantity) {
      throw new ProductNotAvailable();
    }

    product.reserved += quantity;
    product.quantity -= quantity;
    await this.productRepository.save(product);
    await this.checkLowStock(productId);
  }

  /**
   *
   * @param productId
   * @param quantity
   */
  async cancelReservation(productId: string, body: OrderDto): Promise<void> {
    const product = await this.getStockLevel(productId);
    const { quantity } = body;
    if (product.reserved < quantity) {
      throw new NoReservedProduct();
    }
    product.reserved -= quantity;
    product.quantity += quantity;
    await this.productRepository.save(product);
  }

  /**
   *
   * @param productId
   * @param quantity
   */
  async triggerLowStockAlert(
    productId: string,
    quantity: number
  ): Promise<void> {
    console.warn(
      `Low stock alert! Product ID: ${productId}, Remaining Quantity: ${quantity}`
    );
    // TODO: We can send email or sms notification
  }
}
