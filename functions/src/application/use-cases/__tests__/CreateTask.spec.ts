import {CreateTask} from "../CreateTask";
import {Task} from "../../../domain/entities/Task";
import {faker} from "@faker-js/faker";

describe("CreateTask with faker", () => {
  const mockTaskRepository = {
    create: jest.fn(({userId, title, description}) =>
      Promise.resolve(new Task(faker.datatype.uuid(), userId, title, description, "todo", new Date(), new Date()))
    ),
    getById: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  it("crea tarea con datos aleatorios", async () => {
    const useCase = new CreateTask(mockTaskRepository);
    const dto = {
      userId: faker.datatype.uuid(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      status: "todo" as const,
    };
    const task = await useCase.execute(dto);

    expect(task.title).toBe(dto.title);
    expect(task.description).toBe(dto.description);
  });
});
