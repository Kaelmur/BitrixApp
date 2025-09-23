import { isValidPhoneNumber } from "react-phone-number-input";
import z from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.email("Введите корректный email"),
  phone: z
    .string()
    .refine(
      (val) => !val || isValidPhoneNumber(val),
      "Некорректный номер телефона"
    ),
  address: z
    .string()
    .min(5, "Адрес слишком короткий")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
