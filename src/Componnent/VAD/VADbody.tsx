import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import VoiceRecorder from "../Share/VoiceRecorder";

export default function VADBody() {
  const [savedRecordings, setSavedRecordings] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("VAD") || "[]");
    return storage;
  });
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
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
    localStorage.setItem("VAD", JSON.stringify(savedRecordings));
  }, [savedRecordings]);

  return (
    <div className="bg-blue-50 max-h-screen h-auto flex font-Byekan mt-20 justify-around">
      <div className="extended-file">
        {savedRecordings.length > 0 ? (
          <>
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg">
                : فایل های موجود برای حذف قسمت های سکوت
              </span>
            </div>
            <div className="border-b-2 border-gray-600">
              {savedRecordings.map(
                (item: { name: string; audio: string }, index: number) => (
                  <div className="my-2" key={index}>
                    <span>{item.name}:</span>
                    <audio
                      controls
                      src={item.audio}
                      className="w-full mb-3 border border-red-300 rounded-md"
                    />
                    <div className="flex items-center">
                      <span
                        onClick={() => deleteItem(index)}
                        className="text-white text-xl bg-gradient-to-r px-6 py-2 cursor-pointer rounded-2xl hover:scale-105 duration-200 from-red-600 to-red-950"
                      >
                        <MdDeleteForever />
                      </span>

                      <span className="text-white text-base mx-2 bg-gradient-to-r px-6 py-2 cursor-pointer hover:scale-105 duration-200 rounded-2xl from-blue-600 to-blue-950"
                      > تبدیل</span>

                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <span className="text-xl font-bold text-gray-600">
            فایلی برای نمایش  وجود ندارد
          </span>
        )}
      </div>
      <div className="input-div">
        <input
          id="dropzone-file"
          type="file"
          accept=".mp3"
          className="hidden"
          onChange={handleFileChange}
        />
        <VoiceRecorder
          nameComponent="VAD"
          onRecordingComplete={handleNewRecording}
        />
      </div>
    </div>
  );
}
