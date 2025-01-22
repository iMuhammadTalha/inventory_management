import { ApiProperty } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";

export class InventoryDetailResponse extends Response {
  @ApiProperty({ type: Product })
  data: Product;

  constructor(product: Product) {
    super();
    this.data = product;
  }
}
