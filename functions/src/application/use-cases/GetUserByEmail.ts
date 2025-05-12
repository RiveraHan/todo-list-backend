import {inject, injectable} from "tsyringe";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {User} from "../../domain/entities/User";

@injectable()
export class GetUserByEmail {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }
}
