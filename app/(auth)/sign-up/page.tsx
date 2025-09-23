"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import PasswordField from "@/components/PasswordField";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: RegisterFormData) {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Registration failed");
        return;
      }

      toast.success("Учетная запись создана — пожалуйста, войдите");
      router.push("/sign-in");
    } catch (err: unknown) {
      console.error("Client register error:", err);
      toast.error("Ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Регистрация" subtitle="ЛОГОТИП">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          label="Имя"
          placeholder="Введите имя"
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          placeholder="Введите email"
          type="email"
        />
        <PasswordField
          control={control}
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
        />

        <PasswordField
          control={control}
          name="confirmPassword"
          label="Повторите пароль"
          placeholder="Подтвердите пароль"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Отправить"}
        </Button>
      </form>

      <div className="flex items-center gap-2 text-gray-500 text-sm pt-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-2">или</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="text-center text-sm text-gray-500 pt-2">
        <a href="/sign-in" className="text-blue-600">
          Вход
        </a>
      </div>
    </AuthLayout>
  );
}
