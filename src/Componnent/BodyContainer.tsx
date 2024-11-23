/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import image1 from "../IMG/1.png";
import image2 from "../IMG/2.png";
import image3 from "../IMG/3.png";
import image4 from "../IMG/4.png";
import image5 from "../IMG/5.png";
import ItemsComponnets from "./ItemsComponnets";
export default function BodyContainer() {
  const [showWebSite, setShowWebsite] = useState(false);
  return (
    <div
     className="flex flex-wrap items-start justify-between gap-5 w-2/3 mx-auto"
      dir="rtl"
    >
      <ItemsComponnets
        id={1}
        title="ASR"
        discription="فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند"
        link=""
        key={1}
        bgClassName="bg-photoASR"
      />
      <ItemsComponnets
        id={2}
        title="OCR"
        discription="فناوری است که متن را از تصویر و اسناد اسکن شده به متن دیجیتال قابل ویرایش تبدیل میکند"
        link=""
        key={2}
        bgClassName="bg-photoOCR"
      />
      <ItemsComponnets
        id={3}
        title="VAD"
        discription="فناوری است که بخش های حاوی گفتار را در یک سیگنال صوتی شناسایی کرده و از بخش های بدون گفتار تفکیک میکند"
        link=""
        key={1}
        bgClassName="bg-photoVAD"
      />

      <ItemsComponnets
        id={1}
        title="ASR"
        discription="فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند"
        link=""
        key={1}
        bgClassName="bg-photoASR"
      />
      <ItemsComponnets
        id={2}
        title="OCR"
        discription="فناوری است که متن را از تصویر و اسناد اسکن شده به متن دیجیتال قابل ویرایش تبدیل میکند"
        link=""
        key={2}
        bgClassName="bg-photoOCR"
      />
      <ItemsComponnets
        id={3}
        title="VAD"
        discription="فناوری است که بخش های حاوی گفتار را در یک سیگنال صوتی شناسایی کرده و از بخش های بدون گفتار تفکیک میکند"
        link=""
        key={1}
        bgClassName="bg-photoVAD"
      />
    </div>
  );
}
