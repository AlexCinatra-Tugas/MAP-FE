import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr";
import React, { useRef, useState, useEffect } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const mapRef = useRef();
  const initialPos = [-7.971605, 110.276907];

  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onCreate = (e) => {
    const { layer } = e;
    const newData = layer.toGeoJSON();
    setData(newData);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9000/api/mission", {
      name: name,
      data: data,
    });
    navigate("/");
  };

  return (
    <div className='flex flex-col md:grid md:grid-cols-4 h-screen overflow-auto'>
      {/* start mission event section */}
      <section
        className='flex items-center justify-center h-full py-5'
        onSubmit={saveProduct}>
        <form className='flex flex-col items-center justify-start space-y-3 px-5 h-full w-full pt-5'>
          <div className='text-xl text-center font-semibold md:flex md:items-center md:justify-center md:space-x-2'>
            Add the New Data
          </div>
          <div className='w-full flex items-center justify-center py-5'>
            <input
              type='text'
              className='px-2 py-3 w-full rounded-md text-black placeholder:text-center pl-2'
              placeholder='Input Mission Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className='flex flex-col items-center justify-center w-full hover:translate-y-[-1px]'>
            <button
              type='submit'
              className='px-2 py-3 w-full rounded-md bg-green-600'>
              Submit
            </button>
          </div>
        </form>
      </section>
      {/* end mission event section */}

      {/* start map section */}
      <div className='flex items-center justify-center p-5 col-span-3 overflow-hidden'>
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
    </div>
  );
};

export default AddPage;
