"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
