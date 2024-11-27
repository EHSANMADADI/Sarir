import React from 'react'
import HeaderMenue from '../Share/HeaderMenue';
import TitleDetails from '../Share/TitleDetails';
import Body from './Body';

export default function SpeechEnhancement() {
    return (
        <div>
          <HeaderMenue />
          <div className="pb-20 h-screen bg-blue-50">
            <TitleDetails
              title={"ASRابزار تبدیل گفتار انسان به متن"}
              
              detailes="فناوری است که کیفیت و وضوح صدای ظبط شده را با کاهش نویز و تقویت سیگنال های گفتاری بهبود می بخشد"

            />
            <Body />
          </div>
        </div>
      );
}
