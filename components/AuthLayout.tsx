import { AuthLayoutProps } from "@/types";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen text-black">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 sm:px-8">
        <h1 className="text-5xl font-bold mb-2">{subtitle}</h1>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>

        <div className="w-full max-w-sm">{children}</div>
      </div>

      <div className="hidden lg:block w-1/2">
        <Image
          src="/assets/images/hyndai.jpg"
          alt="car"
          height={1000}
          width={1000}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
