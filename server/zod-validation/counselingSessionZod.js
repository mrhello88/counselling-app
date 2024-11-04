const z = require("zod");

// Regular expression to validate the date format YYYY-MM-DD HH:mm:ss
const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

// Leap year checker
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Validates date components based on month and leap year considerations
const isValidDateComponents = (year, month, day) => {
  if (month < 1 || month > 12) return false; // Invalid month
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28, 
    31,  
    30,
    31,
    30,
    31, 
    31,
    30, 
    31,
    30,
    31,
  ];
  return day > 0 && day <= daysInMonth[month - 1]; // Validate the day against the month
};

// Schema for date validation with clear error messages
const counselingSessionSchemaZod = z.object({
  date: z
    .string()
    .min(1, { message: "Date is required." }) // Ensure the date is not empty
    .refine((dateString) => dateRegex.test(dateString), {
      message: "Date must be in the format YYYY-MM-DD HH:mm:ss.",
    })
    .refine(
      (dateString) => {
        const [year, month, day, hour, minute, second] = dateString
          .split(/[- :]/)
          .map(Number);
        return (
          isValidDateComponents(year, month, day) &&
          hour >= 0 &&
          hour < 24 &&
          minute >= 0 &&
          minute < 60 &&
          second >= 0 &&
          second < 60
        );
      },
      {
        message: "Invalid date components: check year, month, or day.",
      }
    )
    .transform((dateString) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date.");
      }
      return date;
    })
    .refine(
      (date) => {
        const now = new Date();
        return date > now; // Ensure the date is in the future
      },
      {
        message: "Date must be in the future.",
      }
    )
    .refine(
      (date) => {
        const minutes = date.getMinutes();
        return minutes === 0 || minutes === 30; // Only allow times with minutes 0 or 30
      },
      {
        message:
          "Please select a time on the hour or half-hour (e.g., 10:00 or 10:30).",
      }
    ),
});

module.exports = counselingSessionSchemaZod;
