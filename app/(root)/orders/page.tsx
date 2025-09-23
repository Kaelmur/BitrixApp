import Orders from "@/components/Orders";
import { getDeals } from "@/lib/bitrix";

export default async function OrdersPage() {
  const deals = await getDeals();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
        <span>Заказы</span>
      </h1>

      <Orders deals={deals} />
    </main>
  );
}
