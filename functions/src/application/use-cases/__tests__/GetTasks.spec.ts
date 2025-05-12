import {GetTasks} from "../GetTasks";
import {Task} from "../../../domain/entities/Task";
import {faker} from "@faker-js/faker";

describe("GetTasks with faker", () => {
  const userId = faker.datatype.uuid();
  const tasks = [
    new Task(faker.datatype.uuid(), userId, faker.lorem.words(2), faker.lorem.sentence(), "todo", new Date(), new Date()),
    new Task(faker.datatype.uuid(), userId, faker.lorem.words(2), faker.lorem.sentence(), "in-progress", new Date(), new Date()),
    new Task(faker.datatype.uuid(), userId, faker.lorem.words(2), faker.lorem.sentence(), "done", new Date(), new Date()),
  ];

  const mockTaskRepository = {
    getAll: jest.fn(() => Promise.resolve(tasks)),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it("should return a user's tasks", async () => {
    const useCase = new GetTasks(mockTaskRepository);
    const result = await useCase.execute(userId);

    expect(result.length).toBe(3);
    expect(result[0].userId).toBe(userId);
  });
});
