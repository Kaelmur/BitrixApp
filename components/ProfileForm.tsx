"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { toast } from "sonner";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Controller } from "react-hook-form";
import { ProfileFormValues, profileSchema } from "@/lib/validations/profile";
import { ProfileFormProps } from "@/types";

export default function ProfileForm({ user }: ProfileFormProps) {
  const normalizedPhone = user.phone
    ? parsePhoneNumber(user.phone, "KZ")?.number
    : "";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: normalizedPhone ?? "",
      address: user.address ?? "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      toast.success("Профиль обновлен");
      reset(values);
    } catch {
      toast.error("Ошибка при обновлении профиля");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
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
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Телефон
        </label>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              {...field}
              defaultCountry="KZ"
              international
              countryCallingCodeEditable={false}
              value={field.value || ""}
              onChange={(val) => field.onChange(val || "")}
              className="w-full rounded-md border border-black px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="+7 777 123 45 67"
            />
          )}
        />
      </div>
      <FormField
        control={control}
        name="address"
        label="Адрес"
        placeholder="г. Алматы, ул. Абая 10"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Редактировать"}
      </Button>
    </form>
  );
}
