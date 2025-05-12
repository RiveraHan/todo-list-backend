import {TaskRepository} from "../../domain/repositories/TaskRepository";
import {Task} from "../../domain/entities/Task";
import {injectable} from "tsyringe";
import {db} from "./firebase";

@injectable()
export class TaskRepositoryFirestore implements TaskRepository {
  private collection = db.collection("tasks");

  async getById(id: string): Promise<Task | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    if (!data) {
      return null;
    }
    return new Task(
      doc.id,
      data.userId,
      data.title,
      data.description,
      data.status,
      data.createdAt.toDate(),
      data.updatedAt ? data.updatedAt.toDate() : new Date(0)
    );
  }

  async getAll(userId: string): Promise<Task[]> {
    const snapshot = await this.collection.where("userId", "==", userId).orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): Task => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return new Task(
        doc.id,
        data.userId as string,
        data.title as string,
        data.description as string,
        data.status as string,
        data.createdAt.toDate() as Date,
        data.updatedAt ? data.updatedAt.toDate() : new Date(0)
      );
    });
  }

  async create(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> {
    const createdAt = new Date();
    const updatedAt = new Date();
    const docRef = await this.collection.add({
      ...task,
      status: "todo",
      createdAt,
      updatedAt,
    });
    return new Task(docRef.id, task.userId, task.title, task.description, task.status, createdAt, updatedAt);
  }

  async update(task: Task): Promise<void> {
    const updatedAt = new Date();
    await this.collection.doc(task.id).update({
      title: task.title,
      description: task.description,
      completed: task.status,
      updatedAt,
    });
  }

  async delete(taskId: string): Promise<void> {
    await this.collection.doc(taskId).delete();
  }
}
