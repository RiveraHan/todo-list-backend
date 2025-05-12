import {z} from "zod";

export const CreateTaskSchema = z.object({
  userId: z.string().min(1, "ID User is required"),
  status: z.enum(["todo", "in-progress", "done"], {
    errorMap: () => ({message: "Status is required"}),
  }),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

