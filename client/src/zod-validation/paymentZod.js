import { z } from "zod";

// Zod schema for payment form validation
export const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: "Card number is required." })
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, { message: "Card number must be in the format '1234 5678 9123 4567'." }),
  cardHolder: z
    .string()
    .min(1, { message: "Cardholder name is required." })
    .max(50, { message: "Cardholder name must be 50 characters or fewer." }),
  expirationDate: z
    .string()
    .min(1, { message: "Expiration date is required." })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiration date must be in the format 'MM/YY'." })
    .refine((date) => {
      const [month, year] = date.split("/").map(Number);
      const expiryDate = new Date(`20${year}`, month - 1); // Last day of the expiration month
      const today = new Date();
      return expiryDate >= today;
    }, { message: "Expiration date cannot be in the past." }),
  cvv: z
    .string()
    .min(1, { message: "CVV is required." })
    .regex(/^\d{3}$/, { message: "CVV must be a 3-digit number." }),
  billingAddress: z
    .string()
    .min(1, { message: "Billing address is required." })
    .max(100, { message: "Billing address must be 100 characters or fewer." }),
});