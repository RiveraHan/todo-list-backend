import {CreateUser} from "../CreateUser";
import {User} from "../../../domain/entities/User";
import {faker} from "@faker-js/faker";

describe("CreateUser with faker", () => {
  const mockUserRepository = {
    getByEmail: jest.fn(),
    create: jest.fn((email: string) => Promise.resolve(new User(faker.datatype.uuid(), email))),
  };

  it("create user with random email", async () => {
    const fakeEmail = faker.internet.email();
    const useCase = new CreateUser(mockUserRepository);
    const user = await useCase.execute(fakeEmail);

    expect(user.email).toBe(fakeEmail);
    expect(user).toBeInstanceOf(User);
  });
});
