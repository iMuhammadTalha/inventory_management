import { Exception } from "@modules/common/responses";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseCode, ResponseMessage } from "@utils/enum";

export class ProductNotFound extends Exception {
  @ApiProperty({ example: ResponseCode.PRODUCT_NOT_FOUND })
  statusCode: number;

  @ApiProperty({ example: ResponseMessage.PRODUCT_NOT_FOUND })
  message: string;

  constructor() {
    super(ResponseCode.PRODUCT_NOT_FOUND, ResponseMessage.PRODUCT_NOT_FOUND);
  }
}

export class ProductNotAvailable extends Exception {
  @ApiProperty({ example: ResponseCode.PRODUCT_NOT_AVAILABLE })
  statusCode: number;

  @ApiProperty({ example: ResponseMessage.PRODUCT_NOT_AVAILABLE })
  message: string;

  constructor() {
    super(
      ResponseCode.PRODUCT_NOT_AVAILABLE,
      ResponseMessage.PRODUCT_NOT_AVAILABLE
    );
  }
}

export class NoReservedProduct extends Exception {
  @ApiProperty({ example: ResponseCode.NO_RESERVE_PRODUCT })
  statusCode: number;

  @ApiProperty({ example: ResponseMessage.NO_RESERVE_PRODUCT })
  message: string;

  constructor() {
    super(ResponseCode.NO_RESERVE_PRODUCT, ResponseMessage.NO_RESERVE_PRODUCT);
  }
}
