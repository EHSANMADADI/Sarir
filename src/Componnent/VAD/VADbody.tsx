/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaPlay } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import VoiceRecorder from "../Share/VoiceRecorder";
import { useStore } from "../../Store/Store";
import { MdDeleteForever } from "react-icons/md";
export default function VADbody() {
  const [savedRecordings, setSavedRecordings] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("recordings") || "[]");
    return storage;
  });
  const [file, setFile] = useState<File | null>(null);
  const { audioURLs, fileNames } = useStore();
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

  const deleteItem = (index: number) => {
    const updateRecording = savedRecordings.filter(
      (_: any, i: number) => i !== index
    );
    setSavedRecordings(updateRecording);
    alert(`delete Item number of ${index}`);
  };

  //////save change in local storage for exampele delet item from savedRecordings
  useEffect(() => {
    localStorage.setItem("recordings", JSON.stringify(savedRecordings));
  }, [savedRecordings]);

  return (
    <div className="bg-blue-50 max-h-screen h-auto flex font-Byekan  mt-20 justify-around">
      <div className="extended-file">
        {savedRecordings !== "[]" ? (
          <>
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg">
                : فایل های موجود برای حذف قسمت های سکوت
              </span>
            </div>
            <div className="flex justify-end p-3 my-3 text-gray-500 font-semibold">
              :فایل اصلی
            </div>
            <div className="border-b-2 border-gray-600">
              {savedRecordings.map(
                (item: { name: string; audio: string }, index: number) => (
                  <div className="my-2" key={index}>
                    <span>{item.name}:</span>
                    <span className="my-2">
                      <audio
                        controls
                        src={item.audio}
                        className="w-full mb-3  border border-red-300 rounded-md"
                      />
                    </span>
                    <div className="flex items-center">
                      <span
                        dir="rtl"
                        className="px-5 cursor-pointer  py-1 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-2xl shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
                      >
                        شروع به تبدیل
                      </span>
                      <span
                        onClick={() => deleteItem(index)}
                        className="text-white text-xl bg-gradient-to-r px-6 py-2 cursor-pointer rounded-2xl from-red-600 to-red-950"
                      >
                        <MdDeleteForever />
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-end p-3 my-3 text-gray-500 font-semibold">
              :فایل بهینه شده
            </div>
          </>
        ) : (
          <span className="text-xl font-bold text-gray-600">
            فایلی وجود ندارد
          </span>
        )}
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
        <VoiceRecorder />
      </div>
    </div>
  );
}
