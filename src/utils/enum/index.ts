export enum ResponseMessage {
  SUCCESS = "Success",
  INTERNAL_SERVER_ERROR = "Internal server error",
  PRODUCT_NOT_FOUND = "Product not found",
  PRODUCT_NOT_AVAILABLE = "Product not available",
  NO_RESERVE_PRODUCT = "No more reserve product",
  GENERIC_ERROR = "Generic Error",
}

export enum ResponseCode {
  SUCCESS = 200,
  INTERNAL_ERROR = 500,
  GENERIC_ERROR = 600,
  PRODUCT_NOT_FOUND = 601,
  PRODUCT_NOT_AVAILABLE = 602,
  NO_RESERVE_PRODUCT = 603,

  BAD_REQUEST = 400,
}

export enum NodeEnv {
  TEST = "test",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}
