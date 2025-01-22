import { BaseEntity } from "@modules/common/entity/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty({ example: 1 })
  productId: string;

  @Column({ type: "integer", default: 0 })
  @ApiProperty({ example: 10 })
  quantity: number;

  @Column({ type: "integer", default: 0 })
  reserved: number;
}
