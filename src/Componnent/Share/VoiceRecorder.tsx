import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaDownload, FaPlay } from "react-icons/fa";
import { IoPauseOutline } from "react-icons/io5";
import { MdRectangle } from "react-icons/md";
import { PiRecordFill } from "react-icons/pi";
import { useStore } from "../../Store/Store";
const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  //   const [audioURL, setAudioURL] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { audioURLs, setAudioURLs, fileNames, setFileNames } = useStore();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURLs(url);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handlePauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    setFileNames(fileName)
    setFileName('');
  };
  console.log(audioURLs);
  console.log(fileNames);
  

  return (
    <div>
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
          value={fileName}
          onChange={(e) => (
            setFileName(e.target.value)
          )}
          className="bg-white focus:outline-blue-600 focus:outline-4 border border-gray-200 px-5 py-1"
        />
      </div>
      <div className="flex items-center justify-center mb-5">
        {!isRecording && (
          <div
            onClick={fileName ? handleStartRecording : undefined}
            className={`${
              fileName
                ? "bg-gray-200 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } p-3 rounded-full mx-1`}
          >
            <span className="text-red-400 text-xl">
              <PiRecordFill />
            </span>
          </div>
        )}

        {isPaused && (
          <div
            onClick={handleResumeRecording}
            className="bg-gray-200 cursor-pointer p-3 rounded-full mx-1"
          >
            <span className="text-blue-600 text-xl">
              <FaPlay />
            </span>
          </div>
        )}
        {!isPaused && isRecording && (
          <div
            onClick={handlePauseRecording}
            className="bg-gray-200 cursor-pointer p-3 rounded-full mx-1"
          >
            <span className="text-blue-500 text-xl">
              <IoPauseOutline />
            </span>
          </div>
        )}
        {isRecording && (
          <div
            onClick={handleStopRecording}
            className="bg-gray-200 cursor-pointer p-3 rounded-full mx-1"
          >
            <span className="text-yellow-500 text-xl">
              <MdRectangle />
            </span>
          </div>
        )}
      </div>
      {/* {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} className="w-full" />
          <a
            href={audioURL}
            download={`${fileName}.webm`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 inline-block"
          >
            <FaDownload className="mr-2 inline-block" />
            Download Recording
          </a>
        </div>
      )} */}
    </div>
  );
};

export default VoiceRecorder;
