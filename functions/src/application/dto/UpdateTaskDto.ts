import {z} from "zod";

export const UpdateTaskSchema = z.object({
  id: z.string().min(1, "ID Task is required"),
  userId: z.string().min(1, " ID User is required"),
  status: z.enum(["todo", "in-progress", "done"], {
    errorMap: () => ({message: "Status is required"}),
  }).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
