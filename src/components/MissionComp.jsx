import React, { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const MissionComp = (props) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div
      className='flex items-center justify-between px-3 py-2 border w-[200px] rounded-md cursor-pointer my-2 hover:translate-y-[-1px]'
      onClick={() => {
        console.log(!isShow);
        setIsShow(!isShow);
      }}>
      <p>{props.name}</p>
      <div className='flex items-center space-x-5'>
        <AiTwotoneEdit />
        <MdDeleteOutline />
      </div>
    </div>
  );
};

export default MissionComp;
