import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr";
import React, { useRef, useState, useEffect } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import GamaForceLogo from "../assets/logo/Gamaforce-Full-White.png";
import { TbPlaneInflight } from "react-icons/tb";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const HomePage = () => {
  const mapRef = useRef();
  // const initialPos = [-7.772297405953391, 110.37734234583341];
  const initialPos = [-7.971605, 110.276907];

  const [row, setRow] = useState({});

  const onCreate = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  const fetcher = async () => {
    const response = await axios.get(`http://localhost:9000/api/mission`);
    return response.data;
  };

  const { data, error } = useSWR("http://localhost:9000/api/mission", fetcher);

  const deleteMission = async (missionId) => {
    await axios.delete(`http://localhost:9000/api/mission/${missionId}`);
    mutate("mission");
  };

  if (!data) {
    return <h1>Error ngab</h1>;
  }

  if (error) {
    return <h1>Error ngab</h1>;
  }
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
              {data.map((items) => {
                return (
                  <div key={items.id}>
                    <GeoJSON data={items.data} />
                  </div>
                );
              })}
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
          <div className='w-full flex items-center justify-center py-5'>
            <Link
              to={"./add"}
              className='px-4 py-3 flex items-center space-x-2 border rounded-md w-[200px]'>
              <TbPlaneInflight />
              <span className='font-semibold'>Tambah Misi</span>
            </Link>
          </div>
          <div className='overflow-y-scroll'>
            <div className='flex flex-col items-center justify-center pr-5'>
              {data.map((items) => {
                return (
                  <Link
                    to={`./edit/${items.id}`}
                    className='flex items-center justify-between px-3 py-2 border w-[200px] rounded-md cursor-pointer my-2 hover:translate-y-[-1px]'
                    key={items.id}>
                    <p>{items.data.properties.name}</p>
                    <div className='flex items-center space-x-5'>
                      <button>
                        <AiTwotoneEdit />
                      </button>
                      <button onClick={() => deleteMission(Number(items.id))}>
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* end mission event section */}
    </div>
  );
};

export default HomePage;
