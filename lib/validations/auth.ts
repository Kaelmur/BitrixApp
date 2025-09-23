import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Логин должен быть не меньше 3 символов"),
    email: z.email("Некорректный email"),
    password: z
      .string()
      .min(6, "Пароль должен быть не меньше 6 символов")
      .regex(/[A-Z]/, "Пароль должен содержать заглавную букву")
      .regex(/[0-9]/, "Пароль должен содержать цифру"),
    confirmPassword: z.string().min(1, "Сегодня без пароля? :)"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export const loginSchema = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(6, "Пароль минимум 6 символов"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
