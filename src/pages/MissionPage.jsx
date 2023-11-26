import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr";
import React, { useRef, useState, useEffect } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useParams } from "react-router-dom";

const MissionPage = () => {
  const mapRef = useRef();
  const initialPos = [-7.971605, 110.276907];
  const { id } = useParams();

  const onCreate = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  const onEdit = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  const [name, setName] = useState("");
  const [row, setRow] = useState({});

  useEffect(() => {
    const getMisiionById = async () => {
      const response = await axios.get(
        `http://localhost:9000/api/mission/${id}`
      );
      const currentRow = response.data;
      setName(currentRow.name);
      setRow(currentRow.data);
      console.log(row);
    };
    getMisiionById();
  }, [id]);

  return (
    <div className='flex flex-col md:grid md:grid-cols-4 h-screen'>
      {/* start mission event section */}
      <section className='flex items-center justify-center h-full py-5'>
        <form className='flex flex-col items-center justify-start space-y-3 px-5 h-full w-full pt-5'>
          <div className='text-xl text-center font-semibold md:flex md:items-center md:justify-center md:space-x-2'>
            Update Mission
          </div>
          <div className='w-full flex items-center justify-center py-5'>
            <div className='w-full flex items-center justify-center py-5'>
              <input
                type='text'
                className='px-2 py-3 w-full rounded-md text-black placeholder:text-center pl-5'
                placeholder='Input Mission Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full hover:translate-y-[-1px]'>
            <button className='px-2 py-3 w-full rounded-md bg-yellow-300 font-semibold'>
              Update
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
                  polyline: false,
                  polygon: false,
                  marker: false,
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                }}
              />
              {/* <GeoJSON data={row} /> */}
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
      {/* end map section */}
    </div>
  );
};

export default MissionPage;
