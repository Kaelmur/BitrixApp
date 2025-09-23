import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

function StreamCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
          <h2 className="text-xl font-bold">Трансляция</h2>
        </div>
        <Link
          href="/stream"
          className="inline-flex px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
        >
          <FiArrowRight className="w-4 h-4 relative top-[2px]" />
          <span className="px-2">Live</span>
        </Link>
      </div>

      <div className="relative w-full h-48">
        <Image
          src="/assets/images/live.jpg"
          alt="Dummy image"
          fill
          priority
          sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default StreamCard;
