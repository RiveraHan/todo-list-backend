import {Router as router} from "express";
import {getTasks, createTask, updateTask, deleteTask} from "../controllers/task.controller";

export const taskRoutes = router();

taskRoutes.get("/:userId", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.put("/:taskId", updateTask);
taskRoutes.delete("/:taskId", deleteTask);
