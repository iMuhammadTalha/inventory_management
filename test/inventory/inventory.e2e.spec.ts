import { Test } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../../src/modules/main/app.module";
import { AppHelper } from "../app.helper";
import { SeedService } from "../../src/utils/seeder/seeder.service";

export let authCookie: string;
let app: INestApplication;
let helper: AppHelper;
let id: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
  helper = new AppHelper(app);
  await helper.init();

  // Get SeedService and run seedData to ensure the database is seeded before tests
  const seedService = app.get<SeedService>(SeedService);
  await seedService.seedData(); // Wait for seeding to complete before proceeding
});

describe("Inventory", () => {
  it("Should get stock level", async () => {
    await request(app.getHttpServer())
      .get(`/inventory/stock-levels/123`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it("should update stock", async () => {
    const response = await request(app.getHttpServer())
      .post("/inventory/update-stock")
      .send({
        eventType: "stockUpdate",
        productId: "123",
        quantity: 10,
        timestamp: new Date().toISOString(),
      });
    expect(response.statusCode).toBe(HttpStatus.OK);
  });
});
afterAll(async () => {
  await helper.afterAll();
});
