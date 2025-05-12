import request from "supertest";
import {app} from "../main";
import {faker} from "@faker-js/faker";

jest.mock("../application/use-cases/CreateTask");
jest.mock("../application/use-cases/GetTasks");
jest.mock("../application/use-cases/UpdateTask");
jest.mock("../application/use-cases/DeleteTask");

import {CreateTask} from "../application/use-cases/CreateTask";
import {GetTasks} from "../application/use-cases/GetTasks";
import {UpdateTask} from "../application/use-cases/UpdateTask";
import {DeleteTask} from "../application/use-cases/DeleteTask";

interface CreateTaskDTO {
    userId: string;
    title: string;
    description: string;
}

interface CreatedTask {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
}

(CreateTask as jest.Mock).mockImplementation(() => ({
  execute: (dto: CreateTaskDTO): Promise<CreatedTask> => Promise.resolve({
    id: faker.datatype.uuid(),
    ...dto,
    status: "todo",
    createdAt: new Date().toISOString(),
  }),
}));

(GetTasks as jest.Mock).mockImplementation(() => ({
  execute: (userId: string) => Promise.resolve([
    {
      id: faker.datatype.uuid(),
      userId,
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]),
}));

(UpdateTask as jest.Mock).mockImplementation(() => ({
  execute: () => Promise.resolve(),
}));

(DeleteTask as jest.Mock).mockImplementation(() => ({
  execute: () => Promise.resolve(),
}));

describe("Task routes with faker", () => {
  const userId = faker.datatype.uuid();

  it("create new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({userId, title: faker.lorem.words(2), description: faker.lorem.sentence(), status: "todo"});

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(userId);
  });

  it("list tasks", async () => {
    const res = await request(app).get(`/tasks/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body[0].userId).toBe(userId);
  });

  it("update task", async () => {
    const res = await request(app)
      .put("/tasks/fake-task-id")
      .send({userId, title: faker.lorem.words(3), status: "done"});

    expect(res.status).toBe(204);
  });

  it("remove task", async () => {
    const res = await request(app).delete("/tasks/fake-task-id");
    expect(res.status).toBe(204);
  });
});
