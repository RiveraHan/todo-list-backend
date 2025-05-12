import {inject, injectable} from "tsyringe";
import {TaskRepository} from "../../domain/repositories/TaskRepository";
import {UpdateTaskDto} from "../dto/UpdateTaskDto";
import {Task} from "../../domain/entities/Task";

@injectable()
export class UpdateTask {
  constructor(
    @inject("TaskRepository")
    private taskRepository: TaskRepository
  ) {}

  async execute(dto: UpdateTaskDto): Promise<void> {
    const existingTasks = await this.taskRepository.getAll(dto.userId);
    const task = existingTasks.find((task) => task.id === dto.id);

    if (!task) {
      throw new Error("Task not found");
    }

    const updatedTask = new Task(
      task.id,
      task.userId,
      dto.title ?? task.title,
      dto.description ?? task.description,
      dto.status ?? task.status,
      task.createdAt,
      task.updatedAt,
    );

    await this.taskRepository.update(updatedTask);
  }
}
