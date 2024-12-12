import { z } from "zod";

export const counselorPersonalInfoSchema = z.object({
  personalInfo: z
    .object({
      name: z
        .string({ message: "Name is required!" })
        .min(2, { message: "Name must be at least 2 characters." })
        .max(50, { message: "Name must be at most 50 characters." })
        .trim(),
      email: z
        .string({ message: "Email is required!" })
        .email({ message: "Invalid email format." })
        .trim(),
      password: z
        .string({ message: "Password is required!" })
        .min(8, { message: "Password must be at least 8 characters." })
        .max(128, { message: "Password must be at most 128 characters." })
        // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        // .regex(/[0-9]/, { message: "Password must contain at least one number." })
        // .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@, $, !, %, *, ?, &)." })
        .trim(),
      confirmPassword: z
        .string({ message: "Confirm Password is required!" })
        .min(8, { message: "Password must be at least 8 characters." })
        .max(128, { message: "Password must be at most 255 characters." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match!",
      path: ["confirmPassword"], // Set the error path to confirmPassword
    }),
});

export const counselorEducationSchema = z.object({
  education: z
    .object({
      degree: z
        .string()
        .min(2, { message: "Degree must be at least 2 characters." })
        .max(100, { message: "Degree must be at most 100 characters." })
        .trim(),
      institution: z
        .string()
        .min(2, { message: "Institution must be at least 2 characters." })
        .max(100, { message: "Institution must be at most 100 characters." })
        .trim(),
      experience: z
        .string()
        .min(1, { message: "Experience must be at least 1 character." })
        .max(50, { message: "Experience must be at most 50 characters." })
        .trim(),
      description: z.string().trim(),
    })
    .refine(
      (data) => {
        const wordCount = data.description.trim().split(/\s+/).length;
        return wordCount >= 10 && wordCount <= 200;
      },
      {
        message: "Description must be between 1 and 200 words.",
      }
    ),
  file: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF.",
    })
    .refine((file) => file.size <= 15 * 1024 * 1024, {
      // Limit to 15MB
      message: "File size must be less than 5MB.",
    }),
});

export const counselorPaymentSchema = z.object({
  payment: z.object({
    accountNumber: z
      .string()
      .min(10, { message: "Account number must be at least 10 characters." })
      .max(20, { message: "Account number must be at most 20 characters." })
      .regex(/^\d+$/, { message: "Account number must contain only numbers." })
      .trim(),
    bankName: z
      .string()
      .min(2, { message: "Bank name must be at least 2 characters." })
      .max(100, { message: "Bank name must be at most 100 characters." })
      .trim(),
    branchCode: z
      .string()
      .min(3, { message: "Branch code must be at least 3 characters." })
      .max(20, { message: "Branch code must be at most 20 characters." })
      .regex(/^\d+$/, { message: "Account number must contain only numbers." })
      .trim(),
  }),
});
