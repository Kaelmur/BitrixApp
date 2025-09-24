"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";

function OrderCard() {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4">
      <div className="flex items-center mb-6">
        <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
        <h2 className="text-xl font-bold">Заказы</h2>
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={3}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="bg-blue-50 rounded-xl shadow p-4  flex flex-col items-center justify-center">
              <Image
                src={`/assets/images/image-${i + 1}.png`}
                alt={`Карточка ${i + 1}`}
                width={500}
                height={500}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />

              <span className="text-center font-medium mb-2">
                Договор #{i + 1}
              </span>

              <button className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm md:text-base hover:bg-blue-600 transition">
                <FiDownload /> Скачать
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination flex justify-center mt-4" />
    </div>
  );
}

export default OrderCard;
