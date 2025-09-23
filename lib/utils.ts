import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { payments } from "@/app/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PaymentStatus = "paid" | "unpaid" | "processing";

export const statusMap: Record<
  PaymentStatus,
  { label: string; color: string; bg: string }
> = {
  paid: {
    label: "Оплачен",
    color: "#2e7d32",
    bg: "rgba(46, 125, 50, 0.1)",
  },
  unpaid: {
    label: "Не оплачен",
    color: "#d32f2f",
    bg: "rgba(211, 47, 47, 0.1)",
  },
  processing: {
    label: "В обработке",
    color: "#ed6c02",
    bg: "rgba(237, 108, 2, 0.1)",
  },
};

export function filterPayments(filter: string) {
  return payments.filter((p) => {
    switch (filter) {
      case "Оплаченные":
        return p.status === "paid";
      case "Неоплаченные":
        return p.status === "unpaid";
      case "В обработке":
        return p.status === "processing";
      default:
        return true;
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortPayments<T extends { [key: string]: any }>(
  data: T[],
  sortConfig: { key: string; direction: "asc" | "desc" } | null
): T[] {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    let aVal: string | number = "";
    let bVal: string | number = "";

    if (sortConfig.key === "name") {
      aVal = a.employee.name;
      bVal = b.employee.name;
    } else if (sortConfig.key === "status") {
      aVal = a.status;
      bVal = b.status;
    } else if (sortConfig.key === "completed") {
      aVal = a.completed;
      bVal = b.completed;
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
}

export const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-yellow-400",
  IN_PROGRESS: "bg-blue-500",
  COMPLETED: "bg-green-500",
  FAILED: "bg-red-500",
};
