"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import PasswordField from "@/components/PasswordField";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormData) {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error || "Ошибка входа");
        return;
      }

      toast.success("Добро пожаловать!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Вход" subtitle="ЛОГОТИП">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit" disabled={loading}>
          Вход
        </Button>
      </form>

      <div className="flex items-center gap-2 text-gray-500 text-sm pt-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-2">или</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="text-center text-sm text-gray-500 pt-2">
        <a href="/sign-up" className="text-blue-600">
          Регистрация
        </a>
      </div>
    </AuthLayout>
  );
}
