import {z} from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
