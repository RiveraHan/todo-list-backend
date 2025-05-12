import "reflect-metadata";
import {container} from "tsyringe";
import {TaskRepository} from "./domain/repositories/TaskRepository";
import {UserRepository} from "./domain/repositories/UserRepository";
import {TaskRepositoryFirestore} from "./infrastructure/firebase/TaskRepositoryFirestore";
import {UserRepositoryFirestore} from "./infrastructure/firebase/UserRepositoryFirestore";

container.registerSingleton<TaskRepository>("TaskRepository", TaskRepositoryFirestore);
container.registerSingleton<UserRepository>("UserRepository", UserRepositoryFirestore);
