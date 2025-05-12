import {DeleteTask} from "../DeleteTask";
import {faker} from "@faker-js/faker";

describe("DeleteTask with faker", () => {
  const mockRepo = {
    delete: jest.fn(() => Promise.resolve()),
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  it("you should delete the task", async () => {
    const taskId = faker.datatype.uuid();
    const useCase = new DeleteTask(mockRepo);

    await useCase.execute(taskId);
    expect(mockRepo.delete).toHaveBeenCalledWith(taskId);
  });
});
