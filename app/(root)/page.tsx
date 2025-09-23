import OrderCard from "@/components/cards/OrderCard";
import ProfileCard from "@/components/cards/ProfileCard";
import StreamCard from "@/components/cards/StreamCard";
import PaymentCard from "@/components/cards/PaymentCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getUserById } from "@/lib/actions/user.action";

export default async function DashboardPage() {
  const jwtUser = await getCurrentUser();
  if (!jwtUser) return <p>Unauthorized</p>;

  const user = await getUserById(jwtUser.id);
  if (!user) return <p>User not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Привет, {user?.name ?? "Гость"} 👋
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OrderCard />
        <ProfileCard user={user} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        <StreamCard />
        <PaymentCard />
      </div>
    </div>
  );
}
