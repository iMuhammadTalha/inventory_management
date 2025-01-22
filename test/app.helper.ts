import { HttpStatus, INestApplication } from "@nestjs/common";
import { Helper } from "./abstrct-helper";

export class AppHelper extends Helper {
  constructor(app: INestApplication) {
    super(app);
  }

  /**
   * Initialize testsuite
   * @returns accessToken
   */
  public async init() {}
}
