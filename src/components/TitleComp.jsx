import React from "react";
import GamaForceLogo from "../assets/logo/Gamaforce-Full-White.png";

const TitleComp = () => {
  return (
    <div>
      <div className='flex items-center justify-center px-3 md:w-fit'>
        <img
          src={GamaForceLogo}
          alt='GamaForce Logo'
          className='w-[60%] md:w-[90%]'
        />
      </div>
    </div>
  );
};

export default TitleComp;
