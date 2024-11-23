import React, { useState } from "react";

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
  const [showWebSite, setShowWebsite] = useState(false);

  return (
    <div
      className="flex flex-col cursor-pointer justify-between max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100"
      style={{ minHeight: "420px" }} // تنظیم ارتفاع ثابت برای آیتم‌ها
    >
      <div
        className={`${bgClassName} rounded-tl-3xl rounded-tr-3xl h-96 flex items-center justify-center`}
      >
        <a href="#">
          {showWebSite ? (
            <span className="text-xl inline-block">ورود به وب سایت</span>
          ) : null}
        </a>
      </div>

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
