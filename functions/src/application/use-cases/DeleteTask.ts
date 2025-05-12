import {inject, injectable} from "tsyringe";
import {TaskRepository} from "../../domain/repositories/TaskRepository";

@injectable()
export class DeleteTask {
  constructor(
    @inject("TaskRepository")
    private taskRepository: TaskRepository
  ) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
