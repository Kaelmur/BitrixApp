"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import FormField from "@/components/FormField";
import { PasswordFieldProps } from "@/types";

export default function PasswordField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: PasswordFieldProps<TFieldValues>) {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      type={show ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      }
    />
  );
}
