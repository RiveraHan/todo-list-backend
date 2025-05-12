import {Task} from "../entities/Task";

export interface TaskRepository {
  getById(id: string): Promise<Task | null>;
  getAll(userId: string): Promise<Task[]>;
  create(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task>;
  update(task: Omit<Task, "createdAt" | "updatedAt">): Promise<void>;
  delete(taskId: string): Promise<void>;
}
