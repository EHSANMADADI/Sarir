import React, { useState } from "react";
import { FaCloudUploadAlt, FaPlay } from "react-icons/fa";
import { IoPauseOutline } from "react-icons/io5";
import { MdDeleteSweep, MdRectangle } from "react-icons/md";
import { PiRecordFill } from "react-icons/pi";

export default function VADbody() {
  const [file, setFile] = useState<File | null>(null);
  const handleButtonClick = () => {
    document.getElementById("dropzone-file")?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setFile(selectedFile);
    }
  };

  return (
    <div className="bg-blue-50 max-h-screen h-auto flex font-Byekan  mt-20 justify-around">
      <div className="extended-file">
        <div className="flex justify-end">
          <span className="text-gray-500 font-Byekan  text-lg">
            : فایل های موجود برای حذف قسمت های سکوت
          </span>
        </div>
      </div>

      <div className="input-div ">
        <input
          id="dropzone-file"
          type="file"
          accept=".mp3"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex justify-end mb-5">
          <span className="text-gray-500 font-Byekan font-bold text-lg">
            : انتخاب فایل از سیستم
          </span>
        </div>

        <div className="mb-16 flex" dir="rtl">
          <button
            onClick={handleButtonClick}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl font-black text-xl shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
          >
            انتخاب فایل ها
            <span className="mr-2">
              <FaCloudUploadAlt />
            </span>
          </button>
          {file && (
            <div className="flex items-center mx-2">
              <span className="text-red-700 cursor-pointer">
                <MdDeleteSweep />
              </span>
              <span className="ml-4 text-gray-700">{file.name} </span>
            </div>
          )}
        </div>

        <div className="flex justify-end mb-7">
          <span className="text-gray-500 font-Byekan font-bold text-lg">
            :رکورد فایل
          </span>
        </div>
        <div className="mb-5">
          <input
            placeholder="اسم فایل رکورد ..."
            type="text"
            dir="rtl"
            className="bg-white focus:outline-blue-600 focus:outline-4 border border-gray-200 px-5 py-1"
          />
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="bg-gray-200 cursor-pointer p-2 rounded-full">
            <span className="text-red-600 text-3xl">
              <PiRecordFill />
            </span>
          </div>
          <div className="bg-gray-200 cursor-pointer p-3 rounded-full">
            <span className="text-blue-600 text-xl">
              <FaPlay />
            </span>
          </div>
          <div className="bg-gray-200 cursor-pointer p-3 rounded-full">
            <span className="text-red-400 text-xl">
              <MdRectangle />
            </span>
          </div>
          <div className="bg-gray-200 cursor-pointer p-3 rounded-full">
            <span className="text-blue-500 text-xl">
              <IoPauseOutline />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
