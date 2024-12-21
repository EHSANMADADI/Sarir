import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";


interface ModalInput{
    Open:boolean,
    onClose:()=>void,
    children:any
}
export default function Modal({ Open, onClose, children }: ModalInput) {

  
  if (!Open) return null;


  const Handelclose = (e: { target: { id: string; }; }) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <div className='md:fixed  inset-y-0 right-0 lg:w-2/3 w-full flex justify-center h-screen items-center transition-colors bg-opacity-25 z-50 ' id='wrapper' onClick={()=>Handelclose}>
      <div className='w-full sm:w-5/6 flex flex-col sm:mx-0 mx-auto'>
        <button className='text-gray-400  place-self-end rounded p-2 mb-1' onClick={() => onClose()}><IoIosCloseCircle className='text-3xl bg-white' /></button>
        <div className='bg-gray-50 border-2 border-dashed rounded p-5 h-[78vh] overflow-auto '>
          <div className='w-full'>
            {children}
          </div>
        </div> 
      </div>
    </div>
  )
}