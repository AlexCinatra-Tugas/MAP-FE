import React from "react";
import MissionComp from "../components/MissionComp";
import { TbPlaneInflight } from "react-icons/tb";
import { Link } from "react-router-dom";

const MissionEventComp = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3 px-5 h-full w-full'>
      <div className='text-xl text-center font-semibold md:flex md:items-center md:justify-center md:space-x-2'>
        Mission Side
      </div>
      <Link
        to={"/mission"}
        className='px-4 py-3 flex items-center space-x-2 border rounded-md w-[200px]'>
        <TbPlaneInflight />
        <span className='font-semibold'>Tambah Misi</span>
      </Link>
      <div className='w-full md:overflow-y-scroll h-[400px]'>
        <div className='flex flex-col items-center justify-center'></div>
      </div>
    </div>
  );
};

export default MissionEventComp;
