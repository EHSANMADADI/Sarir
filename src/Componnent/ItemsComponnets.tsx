/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { HiExternalLink } from "react-icons/hi";
interface ItemsType {
  id: number;
  title: string;
  discription: string;
  link: string;
  bgClassName: string;
}

export default function ItemsComponents({
  id,
  title,
  discription,
  link,
  bgClassName,
}: ItemsType) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-between max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100"
      style={{ minHeight: "420px" }}
    >
      {/* بخش تصویر */}
      <div
        className={`${bgClassName} rounded-tl-3xl rounded-tr-3xl h-96 relative overflow-hidden`}
      >
        {/* لایه سیاه کم‌رنگ */}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

        {/* متن "ورود به وب سایت" */}
        <a
          href="#"
          className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          ورود به وب سایت
          <span className="text-4xl">
            <HiExternalLink />
          </span>
        </a>
      </div>

      {/* بخش توضیحات */}
      <div className="p-5 flex flex-col h-full">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900">
            {title}
          </h5>
        </a>
        <p
          className="font-medium text-lg text-gray-700 mt-auto"
          style={{ textAlign: "justify" }}
        >
          {discription}
        </p>
      </div>
    </div>
  );
}
