"use client";

import { Props } from "@/types";
import { Controller, FieldValues } from "react-hook-form";

export default function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  endAdornment,
}: Props<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{label}</label>
          <div className="relative">
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            {endAdornment && (
              <div className="absolute inset-y-0 right-2 flex items-center">
                {endAdornment}
              </div>
            )}
          </div>

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
