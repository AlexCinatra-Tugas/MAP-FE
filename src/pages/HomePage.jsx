import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr";
import React, { useRef, useState } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import GamaForceLogo from "../assets/logo/Gamaforce-Full-White.png";
import { Link } from "react-router-dom";
import { TbPlaneInflight } from "react-icons/tb";
import data from "../data/dummydata.json";

import MissionComp from "../components/MissionComp";

const HomePage = () => {
  const mapRef = useRef();
  const initialPos = [-7.772297405953391, 110.37734234583341];

  const onCreate = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  // const fetcher = async () => {
  //   const response = await axios.get(`http://localhost:9000/api/mission`);
  //   console.log(response.data[0].properties.name);
  //   return response.data;
  // };

  // const { data } = useSWR("", fetcher);
  // if (!data) {
  //   console.log("no data detect, waiting for data ....");
  // }

  // const deleteMission = async (missionId) => {
  //   await axios.delete(`http://localhost:9000/api/mission/${missionId}`);
  //   mutate("");
  // };

  return (
    <div className='flex flex-col md:grid md:grid-cols-4 row-span-1 h-screen'>
      {/* start title section */}
      <div className='flex items-center justify-center md:justify-center p-5'>
        <div className='flex items-center justify-center px-3 md:w-fit'>
          <img
            src={GamaForceLogo}
            alt='GamaForce Logo'
            className='w-[60%] md:w-[90%]'
          />
        </div>
      </div>
      {/* end title section */}

      {/* start map section */}
      <div className='flex items-center justify-center p-5 md:col-span-3 md:row-span-2 overflow-hidden'>
        <div className='h-full w-full rounded-lg overflow-hidden border-[5px] bg-white'>
          <MapContainer
            center={initialPos}
            zoom={20}
            scrollWheelZoom={false}
            ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <FeatureGroup>
              <EditControl
                position='topright'
                onCreated={onCreate}
                draw={{
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                }}
              />
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
      {/* end map section */}

      {/* start mission event section */}
      <section className='flex items-center justify-center md:h-[400px]'>
        <div className='flex flex-col items-center justify-start space-y-3 px-5 h-full w-full pt-5'>
          <div
            to={"/"}
            className='text-xl text-center font-semibold md:flex md:items-center md:justify-center md:space-x-2'>
            Mission Side
          </div>
          <button className='px-4 py-3 flex items-center space-x-2 border rounded-md w-[200px]'>
            <TbPlaneInflight />
            <span className='font-semibold'>Tambah Misi</span>
          </button>
          <div className='flex flex-col items-center justify-center'>
            {data.map((misi) => {
              return (
                <div key={misi.id}>
                  <MissionComp name={misi.properties.name} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* end mission event section */}
    </div>
  );
};

export default HomePage;
