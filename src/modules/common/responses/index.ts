import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Response } from "../../../response/response";
import { ResponseCode, ResponseMessage } from "@utils/enum";
export class InternalServerError {
  @ApiProperty({ example: "Internal Server Error" })
  message: string;

  @ApiProperty({ example: 500 })
  statusCode: number;
}

export class SuccessResponse extends Response {
  constructor() {
    super();
  }
}

export class Exception {
  constructor(responseCode?: ResponseCode, responseMessage?: ResponseMessage) {
    throw new HttpException(
      {
        statusCode: responseCode || ResponseCode.GENERIC_ERROR,
        message: responseMessage || ResponseMessage.GENERIC_ERROR,
      },
      ResponseCode.BAD_REQUEST,
    );
  }
}