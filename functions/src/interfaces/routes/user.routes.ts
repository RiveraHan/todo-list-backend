import {Router as router} from "express";
import {createUser, getUserByEmail} from "../controllers/user.controller";

export const userRoutes = router();

userRoutes.get("/:email", getUserByEmail);
userRoutes.post("/", createUser);
