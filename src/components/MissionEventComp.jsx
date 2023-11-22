import React from "react";
import MissionComp from "../components/MissionComp";
import { TbPlaneInflight } from "react-icons/tb";

const MissionEventComp = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3 px-5 h-full w-full'>
      <div className='text-xl text-center font-semibold md:flex md:items-center md:justify-center md:space-x-2'>
        Mission Side
      </div>
      <button className='px-4 py-3 flex items-center space-x-2 border rounded-md w-[200px]'>
        <TbPlaneInflight />
        <span className='font-semibold'>Tambah Misi</span>
      </button>
      <div className='w-full flex flex-col items-center justify-center md:overflow-y-scroll h-[400px]'>
        <MissionComp name={"Misi 1"} />
        <MissionComp name={"Misi 2"} />
        <MissionComp name={"Misi 3"} />
        <MissionComp name={"Misi 4"} />
        {/* <MissionComp name={"Misi 5"} />
        <MissionComp name={"Misi 6"} />
        <MissionComp name={"Misi 7"} />
        <MissionComp name={"Misi 8"} />
        <MissionComp name={"Misi 9"} />
        <MissionComp name={"Misi 10"} /> */}
      </div>
    </div>
  );
};

export default MissionEventComp;
