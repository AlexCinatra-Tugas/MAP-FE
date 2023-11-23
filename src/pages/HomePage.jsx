import React from "react";
import MissionEventComp from "../components/MissionEventComp";
import MapComp from "../components/MapComp";
import TitleComp from "../components/TitleComp";

const HomePage = () => {
  return (
    <div className='flex flex-col md:grid md:grid-cols-4 row-span-1 h-screen'>
      <div className='flex items-center justify-center md:justify-center p-5'>
        <TitleComp />
      </div>
      <div className='flex items-center justify-center p-5 md:col-span-3 md:row-span-2 overflow-hidden'>
        <MapComp />
      </div>
      <div className='flex items-center justify-center md:h-[400px]'>
        <MissionEventComp />
      </div>
    </div>
  );
};

export default HomePage;
