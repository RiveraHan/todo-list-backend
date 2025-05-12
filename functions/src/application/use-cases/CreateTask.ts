import {inject, injectable} from "tsyringe";
import {TaskRepository} from "../../domain/repositories/TaskRepository";
import {CreateTaskDto} from "../dto/CreateTaskDto";
import {Task} from "../../domain/entities/Task";

@injectable()
export class CreateTask {
  constructor(
        @inject("TaskRepository")
        private taskRepository: TaskRepository,
  ) {}

  async execute(dto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create({
      ...dto,
      status: "todo",
    } as Omit<Task, "id" | "createdAt" | "updatedAt">);

    return task;
  }
}
