import React, { useRef, useState } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import data from "../data/data.json";

const MissionPage = () => {
  const mapRef = useRef();
  const initialPos = [-7.770318, 110.377788];

  const onCreate = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='p-5 w-1/4'>
        <div>
          <div htmlFor='#' className='text-[15px] py-1 font-semibold'>
            Mission's Name
          </div>
          <input type='text' className='px-1 py-2 rounded-md w-full' />
        </div>
        <div className='py-2'>
          <button className='py-2 px-2 w-full bg-slate-500 rounded-sm'>
            Submit
          </button>
        </div>
      </div>
      <div className='p-5 w-3/4'>
        <div className='h-full w-full rounded-lg p-1 overflow-hidden border-[5px] bg-white'>
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
              {/* <GeoJSON data={data} /> */}
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;

{
  /*  */
}
