/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image1 from "../IMG/1.png";
import image2 from "../IMG/2.png";
import image3 from "../IMG/3.png";
import image4 from "../IMG/4.png";
import image5 from "../IMG/5.png";
export default function BodyContainer() {
  return (   
    <div
      className="flex flex-wrap items-center justify-between w-2/3 mx-auto"
      dir="rtl"
    >
      <div className="  max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100 ">
        <a href="#">
          <img className="rounded-tl-3xl rounded-tr-3xl" src={image1} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 ">
              ASR
            </h5>
          </a>
          <p className="mb-3 font-medium text-lg text-gray-700">
            فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند
          </p>
        </div>
      </div>
      {/* /////////////// */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100 ">
        <a href="#">
          <img className="rounded-tl-3xl rounded-tr-3xl" src={image2} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 ">
              ASR
            </h5>
          </a>
          <p className="mb-3 font-medium text-lg text-gray-700">
            فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100 ">
        <a href="#">
          <img className="rounded-tl-3xl rounded-tr-3xl" src={image3} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 ">
              ASR
            </h5>
          </a>
          <p className="mb-3 font-medium text-lg text-gray-700">
            فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100 ">
        <a href="#">
          <img className="rounded-tl-3xl rounded-tr-3xl" src={image4} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 ">
              ASR
            </h5>
          </a>
          <p className="mb-3 font-medium text-lg text-gray-700">
            فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100 ">
        <a href="#">
          <img className="rounded-tl-3xl rounded-tr-3xl" src={image5} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 ">
              ASR
            </h5>
          </a>
          <p className="mb-3 font-medium text-lg text-gray-700">
            فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100">
        <a href="#">
          <img className="rounded-tl-3xl rounded-tr-3xl" src={image1} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 ">
              ASR
            </h5>
          </a>
          <p className="mb-3 font-medium text-lg text-gray-700">
            فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند
          </p>
        </div>
      </div>
    </div>
  );
}
