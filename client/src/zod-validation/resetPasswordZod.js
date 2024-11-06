import { z } from "zod";

export const resetPasswordZodSchema = z.object({
  password: z
    .string({ message: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(128, { message: "Password must be at most 128 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    }),
});
