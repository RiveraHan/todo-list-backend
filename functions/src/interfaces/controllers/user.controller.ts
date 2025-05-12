import {Request, Response} from "express";
import {container} from "tsyringe";
import {CreateUser} from "../../application/use-cases/CreateUser";
import {GetUserByEmail} from "../../application/use-cases/GetUserByEmail";
import {CreateUserSchema} from "../../application/dto/CreateUserDto";

export const getUserByEmail = async (req: Request, res: Response) => {
  const {email} = req.params;
  try {
    const useCase = container.resolve(GetUserByEmail);
    const user = await useCase.execute(email);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const parseResult = CreateUserSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: parseResult.error.flatten().fieldErrors,
    });
  }

  const {email} = parseResult.data;

  try {
    const useCase = container.resolve(CreateUser);
    const user = await useCase.execute(email);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
