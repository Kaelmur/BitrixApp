import ProfileForm from "@/components/ProfileForm";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getUserById } from "@/lib/actions/user.action";
import Image from "next/image";

export default async function ProfilePage() {
  const jwtUser = await getCurrentUser();
  if (!jwtUser) return <p>Нет прав</p>;

  const user = await getUserById(jwtUser.id);
  if (!user) return <p>Пользователь не найден</p>;

  return (
    <div className="flex justify-center py-10 px-4 md:px-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
          Профиль
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-start gap-8">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-32 h-32 rounded-full border-2 border-blue-500 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/images/profile.svg"
                alt="Avatar"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
