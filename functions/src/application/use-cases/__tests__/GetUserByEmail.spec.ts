import {GetUserByEmail} from "../GetUserByEmail";
import {User} from "../../../domain/entities/User";
import {faker} from "@faker-js/faker";

describe("GetUserByEmail with faker", () => {
  const fakeEmail = faker.internet.email();
  const mockUser = new User(faker.datatype.uuid(), fakeEmail);

  const mockUserRepository = {
    getByEmail: jest.fn(() => Promise.resolve(mockUser)),
    create: jest.fn(),
  };

  it("should return the user if it exists", async () => {
    const useCase = new GetUserByEmail(mockUserRepository);
    const result = await useCase.execute(fakeEmail);

    expect(result).toEqual(mockUser);
  });
});
