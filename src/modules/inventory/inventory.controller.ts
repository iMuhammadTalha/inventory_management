import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { OrderDto, StockUpdateDto } from "./inventory.dto";
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseCode, ResponseMessage } from "@utils/enum";
import { SuccessResponse } from "@modules/common/responses";
import { Response, Request } from "express";
import { InventoryDetailResponse } from "./inventory.response";
import { ProductNotFound } from "./inventory.exception";

@Controller("inventory")
@ApiTags("Inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("stock-levels/:productId")
  @ApiOperation({ summary: "Get stock level" })
  @ApiResponse({
    status: ResponseCode.PRODUCT_NOT_FOUND,
    type: ProductNotFound,
  })
  @ApiOkResponse({
    description: ResponseMessage.SUCCESS,
    type: InventoryDetailResponse,
  })
  async getStockLevel(
    @Param("productId") productId: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const product = await this.inventoryService.getStockLevel(productId);
    res.status(HttpStatus.OK);

    return new InventoryDetailResponse(product);
  }

  @Post("update-stock")
  @ApiOperation({ summary: "Update stock" })
  @ApiOkResponse({
    description: ResponseMessage.SUCCESS,
    type: SuccessResponse,
  })
  @ApiResponse({
    status: ResponseCode.PRODUCT_NOT_FOUND,
    type: ProductNotFound,
  })
  async updateStock(
    @Body() event: StockUpdateDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.inventoryService.updateStock(event);
    res.status(HttpStatus.OK);
    return new SuccessResponse();
  }

  @Put("reserve-order/:productId")
  @ApiOperation({ summary: "Confirm order" })
  @ApiOkResponse({
    description: ResponseMessage.SUCCESS,
    type: SuccessResponse,
  })
  @ApiResponse({
    status: ResponseCode.PRODUCT_NOT_FOUND,
    type: ProductNotFound,
  })
  async confirmOrder(
    @Param("productId") productId: string,
    @Body() body: OrderDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.inventoryService.confirmOrder(productId, body);
    res.status(HttpStatus.OK);
    return new SuccessResponse();
  }

  @Put("cancel-reservation/:productId")
  @ApiOperation({ summary: "Confirm order" })
  @ApiOkResponse({
    description: ResponseMessage.SUCCESS,
    type: SuccessResponse,
  })
  @ApiResponse({
    status: ResponseCode.PRODUCT_NOT_FOUND,
    type: ProductNotFound,
  })
  async cancelReservation(
    @Param("productId") productId: string,
    @Body() body: OrderDto,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.inventoryService.cancelReservation(productId, body);
    res.status(HttpStatus.OK);
    return new SuccessResponse();
  }
}
