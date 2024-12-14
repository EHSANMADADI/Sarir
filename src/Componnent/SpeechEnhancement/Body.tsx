import React, { useState } from 'react'
import { CiSquareChevDown } from 'react-icons/ci';
import { FaCloudUploadAlt, FaPlay } from 'react-icons/fa';
import { IoPauseOutline } from 'react-icons/io5';
import { MdDeleteSweep, MdRectangle } from 'react-icons/md';
import { PiRecordFill } from 'react-icons/pi';
import VoiceRecorder from '../Share/VoiceRecorder';

export default function Body() {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState("GAGNET");
  const listLanguage = ["GAGNET", "DBAIAT"];
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
        <div
          className="flex justify-end"
        >
          <span className="text-gray-500 font-Byekan  text-lg">
            : فایل های موجود برای افزایش کیفیت
          </span>
        </div>
      </div>

      <div className="change-languege">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-end cursor-pointer"
        >
          <span className="text-gray-500 font-Byekan  text-lg">
            :انتخاب مدل
          </span>
        </div>
        <div className="mt-5 flex items-center" dir="rtl">
          <span  onClick={() => setIsOpen(!isOpen)} className="text-gray-400 flex items-center cursor-pointer text-lg bg-white rounded-lg px-6 py-3 ">{selectedLanguages}
          <span className="mr-3"><CiSquareChevDown/></span>
          </span>
         
        </div>
        {isOpen && (
          <div className="flex mt-2  w-40 items-center z-50 flex-col origin-top-right absolute py-5 px-2 bg-white text-gray-700 rounded-xl text-base">
            {listLanguage.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedLanguages(item);
                  setIsOpen(false);
                }}
                className="hover:bg-gray-200 justify-center hover:text-blue-600 py-3 px-5 border-b-2 w-full cursor-pointer  flex text-center items-center"
              >
                <span className="mr-2">{item}</span>
              </div>
            ))}
          </div>
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

        {/* <VoiceRecorder nameComponent={selectedLanguages}/> */}
      </div>
    </div>
  )
}
