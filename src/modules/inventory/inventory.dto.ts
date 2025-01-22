import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsIn, IsISO8601, IsEnum, IsNumber, Min } from "class-validator";
import { EventType } from "./inventory.enum";

export class StockUpdateDto {
  @ApiProperty({ example: EventType.STOCK_UPDATE })
  @IsEnum(EventType)
  eventType: EventType;

  @IsString()
  @ApiProperty()
  productId: string;

  @IsInt()
  @ApiProperty()
  @Min(0)
  quantity: number;

  @IsISO8601()
  @ApiProperty()
  timestamp: string;
}

export class OrderDto {
  @ApiProperty({
    description: "Quantity of the product to confirm",
    example: 10,
  })
  @IsNumber()
  quantity: number;
}
