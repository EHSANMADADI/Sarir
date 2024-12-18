/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PiRecordFill } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { MdDeleteForever, MdRectangle } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { CiSquareChevDown } from "react-icons/ci";
import VoiceRecorder from "../Share/VoiceRecorder";
import WavesurferPlayer from "@wavesurfer/react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import api from "../../Config/api";
import loader from'../../IMG/tail-spin.svg'
export default function ASRbody() {
  const [savedRecordings, setSavedRecordings] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("ASR") || "[]");
    return storage;
  });
  const [converting, setConverting] = useState<boolean[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState("فارسی");
  const listLanguage = ["فارسی", "عربی", "عبری", "انگلیسی"];

  useEffect(() => {
    setConverting(new Array(savedRecordings.length).fill(false));
  }, [savedRecordings]);

  const handleButtonClick = () => {
    document.getElementById("dropzone-file")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      // تبدیل فایل به Base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64Audio = reader.result as string;
        // ایجاد شیء جدید برای فایل
        const newRecording = {
          name: selectedFile.name,
          audio: base64Audio,
        };

        // افزودن به لیست فایل‌ها
        setSavedRecordings((prev: any) => [...prev, newRecording]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const deleteItem = (index: number) => {
    const updatedRecordings = savedRecordings.filter(
      (_: any, i: number) => i !== index
    );
    setSavedRecordings(updatedRecordings);
  };
  const handleNewRecording = (recording: { name: string; audio: string }) => {
    setSavedRecordings((prev: any) => [...prev, recording]);
  };
  useEffect(() => {
    localStorage.setItem("ASR", JSON.stringify(savedRecordings));
  }, [savedRecordings]);

  const [isPlayingMap, setIsPlayingMap] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [wavesurfers, setWavesurfers] = useState<any>({});

  const onReady = (ws: any, index: number) => {
    setWavesurfers((prev: any) => ({
      ...prev,
      [index]: ws, // ذخیره wavesurfer برای هر فایل با استفاده از ایندکس
    }));
    setIsPlayingMap((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const onPlayPause = (index: number) => {
    setIsPlayingMap((prev) => {
      const newMap = { ...prev };

      // اگر یک فایل در حال پخش است، آن را متوقف کنید
      Object.keys(newMap).forEach((key) => {
        const keyIndex = parseInt(key); // تبدیل کلید به عدد
        if (keyIndex !== index) {
          newMap[keyIndex] = false;
        }
      });

      // وضعیت فایل فعلی را تغییر دهید
      newMap[index] = !newMap[index];
      return newMap;
    });

    if (wavesurfers[index]) {
      wavesurfers[index].playPause();
    }
  };
  const handelConvert = async (index: number) => {
    try {
      const recording = savedRecordings[index];
      if (!recording || !recording.audio) {
        alert("فایلی برای ارسال یافت نشد.");
        return;
      }
  
      // فعال کردن وضعیت "صبر کنید" برای دکمه مربوطه
      setConverting((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
  
      // تبدیل Base64 به Blob
      const base64Data = recording.audio.split(",")[1]; // حذف prefix
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/webm" });
  
      // ایجاد FormData و ارسال درخواست
      const formData = new FormData();
      formData.append("file", audioBlob, `${recording.name}.webm`);
  
      const response = await api.post("/api/transcribe/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("نتیجه سرور:", response.data.transcription);
      alert("فایل با موفقیت ارسال شد.");
    } catch (err) {
      console.error("خطا در ارسال فایل:", err);
      alert("خطایی رخ داد.");
    } finally {
      // بازگرداندن وضعیت دکمه به حالت اولیه
      setConverting((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };
  

  return (
    <div className="bg-blue-50 max-h-screen h-auto flex font-Byekan  mt-20 justify-around">
      <div className="extended-file">
        {savedRecordings.length > 0 ? (
          <>
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg">
                : فایل های موجود برای تبدیل به متن قابل ویرایش
              </span>
            </div>
            <div className="border-b-2 border-gray-600">
              {savedRecordings.map(
                (item: { name: string; audio: string }, index: number) => (
                  <div className="mt-2 mb-3" key={index}>
                    <span>{item.name}:</span>
                    <div className="flex items-center w-full border rounded-full px-3 mb-2">
                      <button
                        className="text-lg mx-2"
                        onClick={() => onPlayPause(index)}
                      >
                        {isPlayingMap[index] ? (
                          <span className="text-red-500 text-3xl">
                            <FaPauseCircle />
                          </span>
                        ) : (
                          <span className="text-blue-500 text-3xl">
                            <FaRegCirclePlay />
                          </span>
                        )}
                      </button>
                      <div className="w-5/6 ">
                        <WavesurferPlayer
                          height={50}
                          waveColor="blue"
                          url={item.audio}
                          onReady={(ws) => onReady(ws, index)}
                          onPlay={() =>
                            setIsPlayingMap((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                          onPause={() =>
                            setIsPlayingMap((prev) => ({
                              ...prev,
                              [index]: false,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span
                        onClick={() => deleteItem(index)}
                        className="text-white text-xl bg-gradient-to-r px-6 py-2 cursor-pointer rounded-2xl hover:scale-105 duration-200 from-red-600 to-red-950"
                      >
                        <MdDeleteForever />
                      </span>
                      {converting[index] ? (
                        <span
                         
                          className="text-white text-base mx-2 bg-gradient-to-r px-16 py-2 cursor-pointer hover:scale-105 duration-200 rounded-2xl from-blue-600 to-blue-950"
                        >
                          {" "}
                            <img src={loader} className="w-6 h-5"/>
                        </span>
                      ) : (
                        <span
                          onClick={() => handelConvert(index)}
                          className="text-white text-base mx-2 bg-gradient-to-r px-16 py-2 cursor-pointer hover:scale-105 duration-200 rounded-2xl from-blue-600 to-blue-950"
                        >
                          {" "}
                          تبدیل
                        </span>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <span className="text-xl font-bold text-gray-600">
            فایلی برای نمایش وجود ندارد
          </span>
        )}
      </div>

      <div className="change-languege">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-end cursor-pointer"
        >
          <span className="text-gray-500 font-Byekan  text-lg">
            :انتخاب زبان فایل
          </span>
        </div>
        <div className="mt-5 flex items-center" dir="rtl">
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 flex items-center cursor-pointer text-lg bg-white rounded-lg px-6 py-3 "
          >
            {selectedLanguages}
            <span className="mr-3">
              <CiSquareChevDown />
            </span>
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

        <VoiceRecorder
          nameComponent={"ASR"}
          onRecordingComplete={handleNewRecording}
        />
      </div>
    </div>
  );
}
