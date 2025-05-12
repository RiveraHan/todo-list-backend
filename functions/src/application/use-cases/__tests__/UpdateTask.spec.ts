import {UpdateTask} from "../UpdateTask";
import {Task} from "../../../domain/entities/Task";
import {faker} from "@faker-js/faker";

describe("UpdateTask with faker", () => {
  const userId = faker.datatype.uuid();
  const existingTask = new Task(faker.datatype.uuid(), userId, "Old Title", "Old Desc", "todo", new Date(), new Date());

  const mockRepo = {
    getAll: jest.fn(() => Promise.resolve([existingTask])),
    update: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  it("you should update the task if it exists", async () => {
    const useCase = new UpdateTask(mockRepo);
    const updateDto = {
      id: existingTask.id,
      userId,
      title: faker.lorem.words(2),
      completed: true,
    };

    await useCase.execute(updateDto);
    expect(mockRepo.update).toHaveBeenCalledWith(expect.objectContaining({title: updateDto.title}));
  });
});
