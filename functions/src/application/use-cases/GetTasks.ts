import {inject, injectable} from "tsyringe";
import {TaskRepository} from "../../domain/repositories/TaskRepository";
import {Task} from "../../domain/entities/Task";

@injectable()
export class GetTasks {
  constructor(
    @inject("TaskRepository")
    private taskRepository: TaskRepository
  ) {}

  async execute(userId: string): Promise<Task[]> {
    return this.taskRepository.getAll(userId);
  }
}
