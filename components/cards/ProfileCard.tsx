import { UserProfile } from "@/types";
import Image from "next/image";

function ProfileCard({ user }: { user: UserProfile }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 relative">
      <div className="flex items-center mb-6">
        <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
        <h2 className="text-xl font-bold">Профиль</h2>
      </div>

      <div className="flex items-start gap-10">
        <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 border-blue-500 flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/profile.svg"
            alt="Avatar"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        <ul className="space-y-3 text-gray-700">
          <li>
            <span className="font-semibold">Имя: </span>
            {user.name}
          </li>
          <li>
            <span className="font-semibold">Email: </span>
            {user.email}
          </li>
          <li>
            <span className="font-semibold">Телефон: </span>
            {user.phone || "—"}
          </li>
          <li>
            <span className="font-semibold">Адрес: </span>
            {user.address || "—"}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;
