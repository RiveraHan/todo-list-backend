import {Express} from "express";
import {userRoutes} from "./user.routes";
import {taskRoutes} from "./task.routes";

export const registerRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/tasks", taskRoutes);
};
