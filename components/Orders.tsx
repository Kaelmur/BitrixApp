"use client";

import { repeatOrder } from "@/lib/bitrix";
import { STATUS_COLORS } from "@/lib/utils";
import { Deal } from "@/types";
import { toast } from "sonner";

export default function Orders({ deals }: { deals: Deal[] }) {
  const handleRepeat = async (deal: Deal) => {
    const res = await repeatOrder(deal);
    if (res.success) {
      toast.success("Заказ повторён");
    } else {
      toast.error("Ошибка при повторе заказа");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {deals.map((deal) => (
        <div
          key={deal.ID}
          className="bg-white shadow rounded-xl p-4 flex flex-col justify-between"
        >
          <div>
            <p className="text-sm text-gray-500 flex items-center mb-2">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  STATUS_COLORS[deal.STAGE_ID] || "bg-gray-300"
                }`}
              ></span>
              Статус: {deal.STAGE_ID}
            </p>
            <h2 className="text-lg font-semibold">{deal.TITLE}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Дата заказа:{" "}
              {new Date(deal.DATE_CREATE).toLocaleDateString("ru-RU")}
            </p>
          </div>
          <button
            onClick={() => handleRepeat(deal)}
            className="mt-4 border border-blue-500 text-blue-500 rounded-md py-2 hover:bg-blue-50 transition"
          >
            Повторить заказ
          </button>
        </div>
      ))}
    </div>
  );
}
