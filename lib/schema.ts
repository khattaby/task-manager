import { z } from "zod";
export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum is 100 characters"),
  about: z.string().optional(),
  country: z.string().min(1, "Country Type is required"),
  industryType: z.string().min(1, "Industry Type is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  image: z.string().optional(),
});
