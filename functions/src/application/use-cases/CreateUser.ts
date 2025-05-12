import {inject, injectable} from "tsyringe";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {User} from "../../domain/entities/User";

@injectable()
export class CreateUser {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(email: string): Promise<User> {
    return this.userRepository.create(email);
  }
}
