import { describe } from "node:test";
import request from "supertest";

import type { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppModule } from "@root/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it("/ (GET)", () =>
    request(app.getHttpServer())
      .get("/")
      .expect(res => {
        expect(res.ok).toBeTruthy();
        expect(res.text).toBe("Hello Kitty!");
      }));
});
