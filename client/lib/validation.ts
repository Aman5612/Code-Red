import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  hobbies: z.string().min(2).max(100),
});
