import React, { useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPauseOutline } from "react-icons/io5";
import { MdRectangle } from "react-icons/md";
import { PiRecordFill } from "react-icons/pi";

interface VoiceRecorderProps {
  nameComponent: string;
  onRecordingComplete: (recording: { name: string; audio: string }) => void;
}

export default function VoiceRecorder({
  nameComponent,
  onRecordingComplete,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

        // Convert blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          const recording = { name: fileName, audio: base64Audio };

          // Save to localStorage
          const recordings = JSON.parse(
            localStorage.getItem(nameComponent) || "[]"
          );
          recordings.push(recording);
          localStorage.setItem(nameComponent, JSON.stringify(recordings));

          // Update parent state
          onRecordingComplete(recording);

          audioChunksRef.current = [];
          setFileName("");
        };
        reader.readAsDataURL(audioBlob);
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
  };

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
          onChange={(e) => setFileName(e.target.value)}
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
    </div>
  );
}
