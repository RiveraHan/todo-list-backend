import request from "supertest";
import {app} from "../main";
import {faker} from "@faker-js/faker";

jest.mock("../application/use-cases/CreateUser");
jest.mock("../application/use-cases/GetUserByEmail");

import {CreateUser} from "../application/use-cases/CreateUser";
import {GetUserByEmail} from "../application/use-cases/GetUserByEmail";

(CreateUser as jest.Mock).mockImplementation(() => ({
  execute: (email: string) => Promise.resolve({id: faker.datatype.uuid(), email}),
}));

(GetUserByEmail as jest.Mock).mockImplementation(() => ({
  execute: (email: string) => Promise.resolve({id: faker.datatype.uuid(), email}),
}));

describe("User routes", () => {
  it("retorna 400 si no se envía email", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(400);
  });

  it("crea un usuario con faker", async () => {
    const email = faker.internet.email();
    const res = await request(app).post("/users").send({email});

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(email);
  });

  it("busca usuario por email", async () => {
    const email = faker.internet.email();
    const res = await request(app).get(`/users/${email}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
  });
});
