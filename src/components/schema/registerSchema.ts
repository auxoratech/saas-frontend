import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .regex(/^[A-Za-z]+$/, "Only alphabets allowed"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .regex(/^[A-Za-z]+$/, "Only alphabets allowed"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
