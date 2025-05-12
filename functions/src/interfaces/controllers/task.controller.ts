import {Request, Response} from "express";
import {container} from "tsyringe";
import {GetTasks} from "../../application/use-cases/GetTasks";
import {CreateTask} from "../../application/use-cases/CreateTask";
import {UpdateTask} from "../../application/use-cases/UpdateTask";
import {DeleteTask} from "../../application/use-cases/DeleteTask";
import {CreateTaskSchema} from "../../application/dto/CreateTaskDto";
import {UpdateTaskSchema} from "../../application/dto/UpdateTaskDto";

export const getTasks = async (req: Request, res: Response) => {
  const {userId} = req.params;

  try {
    const useCase = container.resolve(GetTasks);
    const tasks = await useCase.execute(userId);
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const result = CreateTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const useCase = container.resolve(CreateTask);
    const task = await useCase.execute(req.body);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const result = UpdateTaskSchema.safeParse({id: req.params.taskId, ...req.body});

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const useCase = container.resolve(UpdateTask);
    await useCase.execute({id: req.params.taskId, ...req.body});
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const useCase = container.resolve(DeleteTask);
    await useCase.execute(req.params.taskId);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
