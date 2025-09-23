import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";
import Navbar from "@/components/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 bg-[#F5F7F9] text-black">{children}</main>
    </div>
  );
}
